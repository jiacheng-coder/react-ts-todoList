import * as React from 'react';
import { Button, Input, Form, CheckBox } from '@roo/roo';
import Header from './components/Header.jsx'
import '@roo/roo/theme/default/index.css';

const Field = Form.field;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
        };
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value,
        });
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
        });
    }

    render() {
        const { name, password } = this.state;
        return (
            <>
                <Header />
                <Form>
                <Field>
                    <h1>代办清单</h1>
                </Field>
                    <Field label="用户名">
                        <Input
                            value={name}
                            onChange={this.handleNameChange}
                        />
                    </Field>
                    <Field label="密码">
                        <Input
                            type="password"
                            value={password}
                            onChange={this.handlePasswordChange}
                        />
                    </Field>
                    <Field>
                        <CheckBox>已同意相关政策和协议</CheckBox>
                    </Field>
                    <Field>
                        <Button
                            htmlType="submit"
                            className="m-right-md"
                        >
                            确认
                        </Button>
                        <Button
                            type="hollow"
                            className="m-right-md"
                        >
                            取消
                        </Button>
                    </Field>
                </Form>
            </>

        );
    }
}

export default App;