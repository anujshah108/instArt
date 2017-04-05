'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  AlertIOS,
  Clipboard,
  TextInput,
  Button,
  ActionSheetIOS
} from 'react-native';
let ImagePicker = require('react-native-image-picker');
import { RNS3 } from 'react-native-aws3';
import secrets from './secrets.json'
import axios from 'axios'

class CameraCom extends Component {
  constructor(props){
    super(props)
    this.artPic = this.artPic.bind(this)
    this.namePic = this.namePic.bind(this)
    this.onShare - this.onShare.bind(this)
    this.state = {
      arturl: require('./arthere.jpg'),
      nameurl: require('./nameart.jpg'),
      name: ''
    }
  }

  onShare(){
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: 'this.state.arturl.uri',
      message: 'message to go with the shared url',
      subject: 'a subject to go in the email heading',
      excludedActivityTypes: []
    },
    (error) => alert(error), (completed, method) => {
      var text;
      if (completed) {
        text = `Shared via ${method}`;
      }
    else {
      text = 'You didn\'t share';
    }
   });
   };

  artPic(){
    ImagePicker.showImagePicker(null,(response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    let source = { uri: response.uri };
    this.setState({arturl: {uri: source.uri}})

  }
});

  }


  namePic(){
    ImagePicker.showImagePicker(null,(response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    let source = { uri: response.uri };
    let file = {
        // `uri` can also be a file system path (i.e. file://)
        uri: response.uri,
        name: 'artistname.jpg',
        type: "image/jpg"
      }
      let options = {
        keyPrefix: "/",
        bucket: "repostart",
        region: "us-east-1",
        accessKey: secrets.keyA,
        secretKey: secrets.keyB,
        successActionStatus: 201
      }
    RNS3.put(file, options)
      .then(response => {
          if (response.status !== 201) throw new Error("Failed to upload audio to S3");
          console.log(response.body.postResponse.location);
          return axios.get('http://localhost:5000/image').then(function(resp){
            Clipboard.setString(resp.data);
            AlertIOS.alert(
             'COPIED IMAGE TEXT TO CLIPBOARD: ',
             resp.data
            );
            console.log(resp.data)
            this.setState({name: resp.data})
          })
          })
      .catch(err => console.log(err));

    this.setState({nameurl: {uri: source.uri}})

  }
});

  }
  render() {


    return (
      <View style={styles.container}>
      <Text>
      </Text>
      <Text>
      </Text>
      <Text>
      </Text>
      <Text>
      </Text>
      <Image source={require('./repostartlogo.png')} style={{height: 100, width:100, alignSelf: 'center',}}/>
       <Text>
      </Text>
      <TouchableOpacity onPress={this.artPic} style={{height: 150, width:200, alignSelf: 'center',}}>
      <Image source={this.state.arturl} style={{height: 150, width:200, alignSelf: 'center',}}/>
      </TouchableOpacity>
       <Text>
      HELLO
      </Text>
       <Text>
      HELLO
      </Text>
      <TouchableOpacity onPress={this.namePic} style={{height: 150, width:200, alignSelf: 'center',}}>
      <Image source={this.state.nameurl} style={{height: 150, width:200, alignSelf: 'center',}}/>
      </TouchableOpacity>
       <Text>
       </Text>
      <TextInput style={{height: 40, borderColor: 'blue', borderWidth: 1}}></TextInput>
      <Button title='Share' onPress={this.onShare} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

module.exports = CameraCom;