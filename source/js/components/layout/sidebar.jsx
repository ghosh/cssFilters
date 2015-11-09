var React = require('React');
var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

var Sidebar = React.createClass({
    // render: function() {
    //   return (
    //     <aside className="sidebar">
    //         <div className="tabs">
    //           <div className="tabs__headers">
    //             <div className="tabs__item is-active">
    //               <p className="tabs__label">Filters</p>
    //             </div>
    //             <div className="tabs__item">
    //               <p className="tabs__label">CSS</p>
    //             </div>
    //           </div>
    //           <div className="tabs__content">
    //
                  // <div className="slider">
                  //   <div className="slider__content">
                  //     <p className="slider__label">Sepia</p>
                  //     <p className="slider__value">50</p>
                  //   </div>
                  //   <input className="range slider__range" type="range" value="50" min="0" max="100" step="1" />
    //               </div>
    //           </div>
    //         </div>
    //     </aside>
    //   )
    // }
    render: function () {
        return (
          <aside className="sidebar">
            <Tabs className="tabs" onSelect={this.handleSelected} selectedIndex={0} >
             <TabList className="tabs__headers">
               <Tab className="tabs__item">
                 <p className="tabs__label">Foo</p>
               </Tab>
               <Tab className="tabs__item">
                 <p className="tabs__label">Bar</p>
               </Tab>
             </TabList>
              <TabPanel className="tabs__content">

              </TabPanel>
              <TabPanel>
                <h2>Hello from Bar</h2>
              </TabPanel>
            </Tabs>
          </aside>
        );
      }
});

module.exports = Sidebar;
