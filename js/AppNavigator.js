import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Drawer} from 'native-base';
import {Router, Scene} from 'react-native-router-flux';

import * as drawerActions from './actions/drawer';
import * as categoryActions from './actions/category';

import SignIn from './components/signin/';
import Registration from './components/registration/';
import Home from './components/home/';
import CreateProduct from './components/createProduct/';
import CartProduct from './components/cartProduct/';
import SideBar from './components/sideBar';
import {statusBarColor} from './themes/base-theme';

const RouterWithRedux = connect()(Router);

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    closeDrawer: React.PropTypes.func,
  };

  componentWillMount() {
    this.props.actions.allCategories();
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer._root.close();
    }
  }


  openDrawer() {
    this._drawer._root.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.actions.closeDrawer();
    }
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        tweenDuration={150}
        content={<SideBar />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        tweenHandler={(ratio) => {  //eslint-disable-line
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
        negotiatePan>
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle="default"/>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="signin" panHandlers={null} component={SignIn}/>
            <Scene key="registration" panHandlers={null} component={Registration}/>
            <Scene key="createProduct" panHandlers={null} component={CreateProduct}/>
            <Scene key="cartProduct" component={CartProduct}/>
            <Scene key="home" component={Home} panHandlers={null} hideNavBar initial/>
          </Scene>
        </RouterWithRedux>
      </Drawer>
    );
  }
}

function mapStateToProps(state) {
  return {
    drawerState: state.drawer.drawerState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...drawerActions, ...categoryActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
