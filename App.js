import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Status from './src/components/Status';
import MessageList from './src/components/MessageList';
import {
  createImageMessage,
  createLocationMessage,
  createTextMessage
} from './src/utils/MessageUtils';

export default class App extends React.Component {
  state = {
    messages: [
      createImageMessage('https://unsplash.it/300/300'),
      createTextMessage('World'),
      createTextMessage('Hello'),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324
      })
    ]
  }

  handlePressMessage = () => {}

  renderMessageList() {
    const { messages } = this.state;

    return (
      <View style={styles.content}>
        <MessageList
          messages={messages}
          onPressMessage={this.handlePressMessage}
        />
      </View>
    );
  }

  renderInputMethodEditor() {
    return (
      <View style={styles.inputMethodEditor}></View>
    );
  }

  renderToolbar() {
    return (
      <View style={styles.toolbar}></View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Status />
        {this.renderMessageList()}
        {this.renderToolbar()}
        {this.renderInputMethodEditor()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
    backgroundColor: 'white'
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white'
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, .04)',
    backgroundColor: 'white'
  }
});
