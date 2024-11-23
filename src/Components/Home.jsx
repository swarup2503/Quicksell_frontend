import React, { useState } from 'react';
import filterIcon from '../Images/Tuning.svg'; 
import downarrowIcon from '../Images/Downarrow.svg'; 
import './Home.css'; 

export default function Home(props) {
  const [isFilterDropdownVisible, setIsFilterDropdownVisible] = useState(false);   ///state to toggle visibility of filter dropdown

  function handleGroupCriteriaChange(event) {    //handling dropdown and updating grouping criteria
    setIsFilterDropdownVisible(!isFilterDropdownVisible);
    if (event.target.value !== undefined) {
      props.handleGroupValue(event.target.value); // Update grouping criteria in parent component
    }
  }

  function handleOrderCriteriaChange(event) {       //handling dropdown and updating ordering criteria
    setIsFilterDropdownVisible(!isFilterDropdownVisible);
    if (event.target.value !== undefined) {
      props.handleOrderValue(event.target.value); // Update ordering criteria in parent component
    }
  }

  return (
    <>
      <section className="sect">
        <div className="container">
          <div>
            
            <div className="dispbtn" onClick={handleGroupCriteriaChange}>  {/* Display button to toggle filter dropdown */}
              <div className="dispicon dispfilter">
                <img src={filterIcon} alt="Filter icon" />
              </div>
              <div className="heading">Display</div>
              <div className="dispicon drop">
                <img src={downarrowIcon} alt="Dropdown icon" />
              </div>
            </div>

            
            <div                                        // Filter dropdown
              className={isFilterDropdownVisible ? 'dropdown dropdown-show' : 'dropdown'}
            >
              <div className="filters">
                <div className="category">Grouping</div>   {/*grouping filter*/ }
                <div className="dropdown-selector">
                  <select
                    value={props.groupValue}
                    onChange={handleGroupCriteriaChange}
                    className="selector"
                    name="grouping"
                  >
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
              </div>

              
              <div className="filters">
                <div className="category">Ordering</div>   {/*ordering filter*/}
                <div className="dropdown-selector">
                  <select
                    value={props.orderValue}
                    onChange={handleOrderCriteriaChange}
                    className="selector"
                    name="ordering"
                  >
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
