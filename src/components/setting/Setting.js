import React, {Component} from "react";
import { View, ScrollView, Switch, ActivityIndicator, TouchableOpacity, AsyncStorage } from "react-native";
import MenuDrawerBUtton from "../Menu/MenuButtons"
import {Label, Card, Button, Container, Header, Content, Icon, Badge, ListItem} from 'native-base';
import { connect } from 'react-redux';
import { cloud_Data_Check } from '../../cloud/crud_update_cloud';
import styles from "./Styles";
import { insertCloud } from "../../actions/Setting";
import { letast_transection } from "../../actions/Transection";
//
class Setting extends Component{

    constructor(props){
        super(props);
        this.state = {
            Eventnotification: this.props.eventnotification,
            AlertData: this.props.alertData,
            loading: false
        }
        this.navigationWillFocusListener = props.navigation.addListener('willFocus', () => {
            this.SyncChkerDevice();
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
      }

    SyncChkerDevice = async () => {
        try{
            const data = await AsyncStorage.getItem('setting@Data');

            let result;

            if(data !== null){
                let data_load = JSON.parse(data);
                
                result = data_load.sync;

                if(this.state.loading != result){
                    this.setState({
                        loading: result
                    })
                }

            }else{
                console.log("Setting Have No Datas")
            }
        }catch{
            console.log("Setting Async Error")
        }
    }

    componentDidMount(){

     }

    SyncFirebase = async () => {
        this.setState({
            loading: !this.state.loading
        })

        let CloudResult = await cloud_Data_Check(this.props.userID, this.props.all_walllet_card, this.props.all_transection)

        if(CloudResult == true){
            this.props.dispatch(insertCloud())
            this.setState({
                loading: !this.state.loading
            });
            // this.props.navigation.state.params
        }else{
            this.setState({
                loading: !this.state.loading
            })
            
        }
        //this.props.dispatch(insertCloud(this.props.userID, this.props.all_walllet_card, this.props.all_transection));
    }

    toggledata = (value1, value2) => {
        this.setState({
            Eventnotification : value1,
            AlertData : value2
        })
    }

    syncdone = () => {
        return(
            <Badge success style={{alignSelf: "flex-end", paddingTop: 2}}>
                    <Icon name="checkmark" style={{ fontSize: 22, color: "#fff" }}/>
            </Badge>
        )
    }

    syncnotdone = () => {
        return(
            <Badge style={{alignSelf: "flex-end", paddingTop: 2 }}>
                <TouchableOpacity onPress={() => this.SyncFirebase()}>
                    <Icon name="refresh" style={{ fontSize: 22, color: "#fff" }}/>
                </TouchableOpacity>
            </Badge>
        )
    }

    loader = () => {
        return(
            
            <Badge style={{alignSelf: "flex-end", backgroundColor: '#EEEEEE'}}>
                <ActivityIndicator size="small" color="#00ff00" />
            </Badge>
        )
    }

    render(){
        return(
            <Container style={{backgroundColor: "#EEEEEE"}}>
                <Header style={{alignContent: "stretch", backgroundColor: '#EEEEEE', borderColor: '#E0E0E0', borderWidth: 2}}>
                    <View style={{flexDirection: "row", width: "100%", paddingTop: 15, justifyContent: 'center'}}>
                            {/* <MenuDrawerBUtton navigation={this.props.navigation}/> */}
                            <Label style={{marginLeft: 30, color: "#424242", fontSize: 22, fontWeight: "bold"}}>
                                Settings      
                            </Label>
                    </View>
                </Header>
                <Content>
                    <ScrollView style={{paddingTop: 50 }}>
                        <View style={{width: "100%"}}>
                            
                            <ListItem>
                                <View style={{width: '50%'}}>
                                    <Label>
                                    Event Reminder
                                    </Label>
                                </View>
                                <View style={{alignItems: "flex-end", width: '50%'}}>
                                    <Switch
                                        onValueChange = {(val) => this.toggledata(val, this.state.AlertData)}
                                        value = { this.state.Eventnotification }
                                        />
                                </View>
                            </ListItem>
                            <ListItem>
                                <View style={{width: '50%'}}>
                                    <Label>
                                        Sync Now
                                    </Label>
                                </View>
                                <View style={{flex: 1, width: '50%'}}>
                                    {
                                       this.state.loading == true ? this.loader() : (
                                            this.props.sync == true ? this.syncdone() : this.syncnotdone() 
                                       )
                                    }
                                </View>
                            </ListItem>
                            <ListItem>
                                <View style={{width: '50%'}}>
                                    <Label>
                                    Alert
                                    </Label>
                                </View>
                                <View style={{alignItems: "flex-end", width: '50%'}}>
                                    <Switch
                                        onValueChange = {(val) => this.toggledata(this.state.Eventnotification, val)}
                                        value = { this.state.AlertData }
                                        />
                                </View>
                            </ListItem>                            
                        </View>
                    </ScrollView>         
                </Content>               
            </Container>

        )
    }
}


const mapStateProps = (state) => {
    
    const sync = state.TRASECTION.sync;
    const loaded = state.SETTING.loading;
    const eventnotification = state.SETTING.eventnotification;
    const alertData = state.SETTING.alert;
    const userID = state.SETTING.useremail;
    const all_walllet_card = state.TRASECTION.all_walllet_card;
    const all_transection = state.TRASECTION.all_transection;
    const WalidChker = state.SETTING.WalidChker;
    return {
        sync,
        loaded,
        eventnotification,
        alertData,
        userID,
        all_walllet_card,
        all_transection,
        WalidChker
    }
}

export default connect(mapStateProps)(Setting)