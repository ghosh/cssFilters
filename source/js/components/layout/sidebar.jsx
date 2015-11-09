var React = require('React');
var RangeSlider = require('../range.jsx');
var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

var Sidebar = React.createClass({
    getInitialState: function() {
      return {
        contrast: 50,
        sepia: 0
      }
    },

    handleOnChange: function(event) {
      this.setState({
        contrast: this.refs.contrast.refs.range.value,
        sepia: this.refs.sepia.refs.range.value
      });
    },

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
                <RangeSlider ref="contrast" label="Contrast" value={this.state.contrast} handleOnChange={this.handleOnChange}/>
                <RangeSlider ref="sepia" label="Sepia" value={this.state.sepia} handleOnChange={this.handleOnChange}/>
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
