/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ViewPagerAndroid,
  TouchableHighlight,
  ListView,
  TextInput,
  BackAndroid

} from 'react-native';
var MakeMojiTextInput = require('./MakeMojiRN/MakeMojiTextInput');// MakeMojiTextInput from './MakeMojiRN/MakeMojiTextInput'
import MakeMojiEditTextAndroid from './MakeMojiRN/MakeMojiEditTextAndroid'
import MakeMojiText from './MakeMojiRN/MakeMojiText'
import TimerMixin from 'react-timer-mixin';

class MakeMojiReactNative extends Component {

    constructor(props){
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {htmlMessages:[],
    dataSource:ds.cloneWithRows([]),
    outsideEditText:' '};
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this.refs.mojiInput.canGoBack()){
                this.refs.mojiInput.onBackPressed();
                return true;
            }
            return false;
        });

    }
    componentDidMount(){
        //this.setState({outsideEditText:'topEditText'});
    }
  render() {
    return (
      <View keyboardShouldPersistTaps={false} style={styles.container}>
          <MakeMojiEditTextAndroid keyboardShouldPersistTaps={false} style={styles.editText} finderTag={'topEditText'} ref={'topEditText'} onHtmlGenerated={this.sendPressed.bind(this)}/>
          <TextInput blurOnSubmit={false} keyboardShouldPersistTaps={false} style={styles.editText} />

          <TouchableHighlight onPress={this.genHtml.bind(this)}>
             <Text style={styles.welcome} selectable={true}>
                  Grab Text from top edit text.
             </Text>
              </TouchableHighlight>

          <TouchableHighlight onPress={() =>this.setState({outsideEditText:'topEditText'})}>
            <Text style={styles.instructions}>
              Attatch Edit Text
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.setState({outsideEditText:null})}>
              <Text style={styles.instructions}>
                  Detatch Edit Text
              </Text>
          </TouchableHighlight>
          <ListView style={{flex:1,alignSelf:'stretch'}}
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    renderRow={(rowData) => <MakeMojiText  textSize={14.0} onHyperMojiPress={this.log} style={styles.instructions} html={rowData}/>}
          />
        <MakeMojiTextInput outsideEditText={this.state.outsideEditText} ref={'mojiInput'} style={styles.moji} minSendLength={0} alwaysShowEmojiBar={false} onSendPress={this.sendPressed.bind(this)} onHyperMojiPress={this.log} onCameraPress={this.log}/>
          <Text style={styles.instructions}>
              below3
          </Text>
      </View>
    );
  }
  genHtml(){
      this.refs.topEditText.requestHtml(true,true);//args:should clear input;should send text to analytics
  }
  sendPressed(sendObject){
      console.log('send pressed', sendObject);
      var htmlMessages = [...this.state.htmlMessages,sendObject.html];
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({htmlMessages:htmlMessages,dataSource:ds.cloneWithRows(htmlMessages)});
  }
  log(event){
      console.log('',event);
  }

}

const styles = StyleSheet.create({
    editText:{

        alignSelf: 'stretch',
    },
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
      height:25,
    marginBottom: 5,
      fontSize:20
  },
  moji:{

      height:100,
      justifyContent: 'flex-end',
    alignSelf: 'stretch'
  }
});

AppRegistry.registerComponent('MakeMojiReactNative', () => MakeMojiReactNative);
