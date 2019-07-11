import React from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import { ListUsers } from "./components";
import "antd/dist/antd.css";
import "./App.css";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header>
          <h2>Node Blog API Demo</h2>
        </Header>
        <Content>
          <Route exact path="/" component={ListUsers} />
          <Route
            path="/users/:id"
            render={props => {
              return <ListUsers {...props} />;
            }}
          />
        </Content>
        <Footer>
          Copyright &copy; {new Date().getFullYear()} Michael Hart
        </Footer>
      </Layout>
    </div>
  );
}

export default App;

