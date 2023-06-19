import * as React from 'react';
import Tabs from '@roo/roo/Tabs';
const { Pane: TabPane } = Tabs;
class TabsBasics extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            value: 'tab1',
        };
        this.onTabClick = (name) => {
            this.setState({
                value: name,
            });
        };
    }
    render() {
        return (<>
                <Tabs value={this.state.value} onTabClick={this.onTabClick}>
                    <TabPane label="这是选项卡一" name="tab1">
                        图文资讯一
                    </TabPane>
                    <TabPane label="选二" name="tab2">
                        图文资讯二
                    </TabPane>
                    <TabPane label="选项卡三" name="tab3">
                        图文资讯三
                    </TabPane>
                </Tabs>
            </>);
    }
}
export default TabsBasics;