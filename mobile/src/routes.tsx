import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Orphanagemap from "./pages/Orphanagemap";
import OrphanageDetails from "./pages/OrphanageDetails";
import OrphanageData from "./pages/CreateOrphanage/OrphanageData";
import SelectMapPosition from "./pages/CreateOrphanage/SelectMapPosition";
import Header from "./components/header";

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ 
        headerShown: false,
        cardStyle: {
          backgroundColor: '#f2f3f5'
        }
      }}>
        <Screen
          name="Orphanagemap"
          component={Orphanagemap}
        ></Screen>
        <Screen
          name="OrphanageDetails"
          component={OrphanageDetails}
          options={{
            headerShown: true,
            header: () => <Header sowCancel={false} title="Orfanato"></Header>
          }}
        ></Screen>
        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa"></Header>
          }}
        ></Screen>
        <Screen
          name="OrphanageData"
          component={OrphanageData}
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados"></Header>
          }}
        ></Screen>
      </Navigator>
    </NavigationContainer>
  );
}