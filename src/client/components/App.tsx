import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';

import { UserForm } from "./Forms/UserForm";
import { UserCard } from "./UserCard";
import { IUser } from "../interfaces/IUser";
import { ToastContainer, toast } from 'react-toastify';
import SearchInput from './SearchInput';

const reactImg = require('../assets/react-logo.png');
const nodeImg = require('../assets/nodejs-logo.png');
const mongoImg = require('../assets/mongo-logo.png');
const tsImg = require('../assets/ts-logo.png');

interface IAppState {
  user: IUser,
  searchTerm: string,
  showUser: boolean
}

export class App extends React.Component<{}, IAppState>  {
  constructor({}) {
    super({});

    this.state = {
      user: {} as IUser,
      searchTerm: '',
      showUser: false
    }
  }

  onSearchChange = (e: React.ChangeEvent<any>) : void => {
    if(e.currentTarget.value.length > 0) 
      this.setState({ searchTerm: e.currentTarget.value});
  }

  onSearchClick = () => {
    const { searchTerm } = this.state;
    if(searchTerm.length) {
      fetch(`/api/user/id/${searchTerm}`, {
        method: 'GET'
      })
      .then(res => {
        if(res.ok) return res.json();
        return false;
      })
      .then(data => {
        if(data)
          this.setState({ user: data, showUser: true });
        else
          toast.error('User not found');
      });
    }
  }

  dismissUserCard = (): void => {
    this.setState({ showUser: false });
  }

  render() {
    return (
      <div className='container-fluid mb-5'>
        <ToastContainer />
        <div className='text-center p-5'>
          <h1 className='mb-5 border-bottom border-primary'>React, TypeScript, and MongoDB</h1>
          <div className='w-75 m-auto'>
            <SearchInput 
              className='form-control'
              placeholder='Search users by ID number'
              onSearchChange={e => this.onSearchChange(e)}
              onSearchTrigger={_ => this.onSearchClick()}
            />
          </div>
        </div>
        <div className='w-50 m-auto pb-3 border-bottom border-primary'>
          {
            !this.state.showUser ?
              <UserForm /> :
              (
                <div>
                  <UserCard user={this.state.user} />
                  <button className='btn btn-danger mt-2 col-12' onClick={_ => this.dismissUserCard()}>
                    Close
                  </button>
                </div>
              )
          }
        </div>
        <div className="row">
          <div className="col-lg-12 text-center pt-3">Made with:</div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            <img className="rounded-circle p-1 m-1 border border-primary" src={reactImg} alt="" width="50" height="50"/>
            <img className="rounded-circle p-1 m-1 border border-primary" src={tsImg} alt="" width="50" height="50"/>
            <img className="rounded-circle p-1 m-1 border border-success" src={nodeImg} alt="" width="50" height="50"/>
            <img className="rounded-circle p-1 m-1 border border-success" src={mongoImg} alt="" width="50" height="50"/>
          </div>
        </div>
      </div>
    );
  }
}
