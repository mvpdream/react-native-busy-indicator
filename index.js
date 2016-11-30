import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  DeviceEventEmitter,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1
  },
  progressBar: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
});

const BusyIndicator = React.createClass({
  propTypes: {
    color: React.PropTypes.string,
    overlayColor: React.PropTypes.string,
    overlayHeight: React.PropTypes.number,
    overlayWidth: React.PropTypes.number,
    startVisible: React.PropTypes.bool,
    text: React.PropTypes.string,
    textColor: React.PropTypes.string,
    textFontSize: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      isDismissible: false,
      overlayWidth: 120,
      overlayHeight: 90,
      overlayColor: '#333333',
      color: '#f5f5f5',
      startVisible: false,
      text: 'Please wait...',
      textColor: '#f5f5f5',
      textFontSize: 13
    };
  },

  getInitialState() {
    return {
      isVisible: this.props.startVisible
    };
  },
  componentDidMount () {
    this.emitter = DeviceEventEmitter.addListener('changeLoadingEffect', this.changeLoadingEffect, null);
  },

  componentWillUnmount() {
    this.emitter.remove();
  },

  changeLoadingEffect(state) {
    this.setState({
      isVisible: state.isVisible,
      text: state.title ? state.title : 'Please wait...'
    });
  },


  render() {
    const customStyles = StyleSheet.create({
      overlay: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 10,
        backgroundColor: this.props.overlayColor,
        width: this.props.overlayWidth,
        height: this.props.overlayHeight
      },
       container: {
        position: 'absolute',
        backgroundColor:this.props.bgColor?this.props.bgColor:'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1
      },
      text: {
        color: this.props.textColor,
        fontSize: this.props.textFontSize,
        marginTop: 8
      }
    });

    if (!this.state.isVisible) {
      return (<View />);
    } else {
      return (
        
        <View style={customStyles.container}>
          <View style={customStyles.overlay}>
            {
              this.props.loadType==1?<Bars size={this.props.loadSize} color={this.props.color} />:
                this.props.loadType==2?<Bubbles size={this.props.loadSize} color={this.props.color} />:
                  this.props.loadType==3?<Pulse size={this.props.loadSize} color={this.props.color} />:
                    this.props.loadType==4?<DoubleBounce size={this.props.loadSize} color={this.props.color} />:
                      <Bars size={this.props.loadSize} color={this.props.color} />
            }
            <Text numberOfLines={1} style={customStyles.text}>
              {this.state.text}
            </Text>
          </View>
        </View>

      );
    }
  }
});

module.exports = BusyIndicator;
