import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import Board from './Components/Board';
import Home from './Components/Home';

function App() {
  const statusOptions = ['In progress', 'Backlog', 'Todo', 'Done', 'Cancelled'];   //list of status available for grouping tickets

  const userOptions = ['Anoop Sharma', 'Yogesh', 'Shankar Kumar', 'Ramesh', 'Suresh']; //List of users 

  const priorityOptions = [                          // priority values
    { name: 'No priority', priority: 0 },
    { name: 'Low', priority: 1 },
    { name: 'Medium', priority: 2 },
    { name: 'High', priority: 3 },
    { name: 'Urgent', priority: 4 },
  ];

   
  const [groupCriteria, setGroupCriteria] = useState(loadGroupCriteriaFromLocalStorage() || 'status');   // current grouping criteria


  const [orderCriteria, setOrderCriteria] = useState('title');   //current ordering criteria

  
  const [ticketData, setTicketData] = useState([]);   //// Ticket data fetched from API and processed

  const sortTickets = useCallback(      //Function to order tickkets based on selected criteria
    async (tickets) => {
      if (orderCriteria === 'priority') {
        tickets.sort((a, b) => b.priority - a.priority);
      } else if (orderCriteria === 'title') {
        tickets.sort((a, b) => a.title.localeCompare(b.title));
      }
      await setTicketData(tickets); // Update state with sorted tickets
    },
    [orderCriteria]
  );

  function saveGroupCriteriaToLocalStorage(criteria) {            // Save grouping criteria to localStorage for persistence
    localStorage.setItem('groupCriteria', JSON.stringify(criteria));
  }

 
  function loadGroupCriteriaFromLocalStorage() {       // Load grouping criteria from localStorage if it exists
    const storedCriteria = localStorage.getItem('groupCriteria');
    return storedCriteria ? JSON.parse(storedCriteria) : null;
  }

  
  useEffect(() => {               // Fetch ticket and user data from the API and process it
    saveGroupCriteriaToLocalStorage(groupCriteria);

    async function fetchAndProcessData() {
      const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
      if (response.status === 200) {
        const processedTickets = processTicketData(response.data);
        await setTicketData(processedTickets);
        sortTickets(processedTickets);
      }
    }

    function processTicketData(data) {        // Function to merge ticket data and user
      const mergedTickets = [];
      for (const ticket of data.tickets) {
        const user = data.users.find((user) => user.id === ticket.userId);
        if (user) {
          mergedTickets.push({ ...ticket, userObj: user });
        }
      }
      return mergedTickets;
    }

    fetchAndProcessData();
  }, [sortTickets, groupCriteria]);

  
  function handleGroupCriteriaChange(newCriteria) {    //// Update the grouping criteria
    setGroupCriteria(newCriteria);
    console.log('Group Criteria Updated:', newCriteria);
  }

  function handleOrderCriteriaChange(newCriteria) {     // Update the ordering criteria
    setOrderCriteria(newCriteria);
    console.log('Order Criteria Updated:', newCriteria);
  }

  return (
    <>
      {/* Home component for controlling grouping and ordering */}
      <Home
        groupValue={groupCriteria}
        orderValue={orderCriteria}
        handleGroupValue={handleGroupCriteriaChange}
        handleOrderValue={handleOrderCriteriaChange}
      />
      <section className="details">
        <div className="details-list">
          {
            {
              status: (
                <>
                  {statusOptions.map((status) => (
                    <Board
                      key={status}
                      groupValue="status"
                      orderValue={orderCriteria}
                      listTitle={status}
                      listIcon=""
                      statusList={statusOptions}
                      ticketDetails={ticketData}
                    />
                  ))}
                </>
              ),
              user: (
                <>
                  {userOptions.map((user) => (
                    <Board
                      key={user}
                      groupValue="user"
                      orderValue={orderCriteria}
                      listTitle={user}
                      listIcon=""
                      userList={userOptions}
                      ticketDetails={ticketData}
                    />
                  ))}
                </>
              ),
              priority: (
                <>
                  {priorityOptions.map((priority) => (
                    <Board
                      key={priority.priority}
                      groupValue="priority"
                      orderValue={orderCriteria}
                      listTitle={priority.priority}
                      listIcon=""
                      priorityList={priorityOptions}
                      ticketDetails={ticketData}
                    />
                  ))}
                </>
              ),
            }[groupCriteria]
          }
        </div>
      </section>
    </>
  );
}

export default App;
