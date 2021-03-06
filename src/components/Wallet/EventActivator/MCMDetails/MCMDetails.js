import React, { useEffect } from "react";
import { ScrollView, Text, ActivityIndicator, StatusBar } from "react-native";
import { Container, Card, View, Grid, Row, Col } from "native-base";
import HeaderMenu from "../../ComponentHeader/HeaderMenu";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";

import { load_all_mcm_details } from "../../../../actions/EventActivator";

let check = moment(new Date());

let Current_month = check.format("MMMM");

const CusTomCol = props => {
  return (
    <Col>
      <Text
        style={{
          fontFamily: "AlexandriaFLF-Bold",
          fontSize: 14,
          color: "#000"
        }}
      >
        {props._data}
      </Text>
    </Col>
  );
};

const CustomRow = props => {
  return (
    <Row
      style={{
        padding: 5
      }}
    >
      <CusTomCol _data={props.name} />
      <CusTomCol _data={props.value} />
    </Row>
  );
};

const CustomCard = props => {
  return (
    <Card style={{ padding: 10 }}>
      <CustomRow name="Name : " value={props.data.name} />
      <CustomRow name="Price : " value={props.data.price} />
      <CustomRow name="Category : " value={props.data.catagory} />
      <CustomRow name="Notes : " value={props.data.notes} />
    </Card>
  );
};

const MCM_Details = props => {
  const title = "Monthly Cost Management";

  const loader = useSelector(state => state.EVENT_AC.load);
  const loaded_data = useSelector(state => state.EVENT_AC.loaded_data);
  const total_price = useSelector(state => state.EVENT_AC.total_price);

  const dispatch = useDispatch();
  const sess = props.navigation.state.params.session;

  useEffect(() => {
    console.log(sess);
    dispatch(load_all_mcm_details(sess));
  }, []);
  return (
    <Container>
      <StatusBar hidden />
      <HeaderMenu props={props.navigation} title={title} />

      {loader == true ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : loaded_data.length == 0 ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{
              fontFamily: "AlexandriaFLF-Bold",
              fontSize: 20,
              color: "#000"
            }}
          >
            No DATA Avaliable !
          </Text>
        </View>
      ) : (
        <ScrollView style={{ height: 1400, padding: 10 }}>
          {loaded_data.map((e, i) => (
            <CustomCard data={e} key={i} />
          ))}
          <View
            style={{
              height: 50,
              width: "100%",
              paddingTop: 10
            }}
          >
            <View
              style={{ backgroundColor: "#000", height: 2, width: "100%" }}
            ></View>
            <Grid>
              <Col>
                <Text
                  style={{
                    fontFamily: "AlexandriaFLF-Bold",
                    fontSize: 22,
                    color: "#000",
                    fontWeight: "bold"
                  }}
                >
                  Total :
                </Text>
              </Col>
              <Col>
                <Text
                  style={{
                    fontFamily: "AlexandriaFLF-Bold",
                    fontSize: 22,
                    color: "#6A0DAD",
                    fontWeight: "bold"
                  }}
                >
                  {total_price}
                </Text>
              </Col>
            </Grid>
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default MCM_Details;
