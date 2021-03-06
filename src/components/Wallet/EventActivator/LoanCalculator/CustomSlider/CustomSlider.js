import React, { useState } from "react";
import { View, Slider, Text } from "react-native";

const CustomSlider = props => {
  const [count, setCount] = useState(0);
  const DurationMonthOrTime = props.name == "Interest Rate" ? 20 : 48;
  return (
    <View
      style={{
        flex: 1.3,
        paddingLeft: 23
      }}
    >
      <View
        style={{
          flex: 0.6,
          justifyContent: "flex-end"
        }}
      >
        <Text style={{ fontFamily: "icofont" }}>
          {props.name} : {count} {props.name == "Interest Rate" ? "%" : "Year"}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={1}
          maximumValue={DurationMonthOrTime}
          step={1}
          minimumTrackTintColor="#4527A0"
          maximumTrackTintColor="#E3F2FD"
          onValueChange={e => (
            setCount(e), props.setStateNow(e), console.log(props)
          )}
        />
      </View>
    </View>
  );
};

export default CustomSlider;
