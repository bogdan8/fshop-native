import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';
import {Container, Header, Title, Content, Text, Button, Icon, Left, Body, Right} from 'native-base';
import {Grid, Row} from 'react-native-easy-grid';

import {setIndex} from '../../actions/list';
import {openDrawer} from '../../actions/drawer';
import styles from './styles';

class Home extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
  }

  newPage(index) {
    this.props.setIndex(index);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.signin({ type: ActionConst.RESET })}>
              <Icon active name="power"/>
            </Button>
          </Left>

          <Body>
          <Title>{(this.props.name) ? this.props.name : 'Home'}</Title>
          </Body>

          <Right>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon active name="menu"/>
            </Button>
          </Right>
        </Header>

        <Content>
          <Grid style={styles.mt}>
          </Grid>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  name: 'Bobo',
});

export default connect(mapStateToProps, bindAction)(Home);
