import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { Feather } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import mapMarker from '../images/map-marker.png';
import { RectButton } from "react-native-gesture-handler";
import api from "../services/api";

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
}

export default function Orphanagemap() {
  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    }).catch(error => console.log(error));
  });

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  return (
    <View style={styles.container}>
      <MapView 
        provider={ PROVIDER_GOOGLE }
        style={styles.map}
        initialRegion={{
          latitude: -29.6872635,
          longitude:-51.128305,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {
          orphanages.map(orphanage => {
            return (
              <Marker
                key={orphanage.id}
                icon={mapMarker}
                calloutAnchor={{
                  x: 2.2,
                  y: 0.7
                }}
                coordinate={{
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude,
                }}
              >
                <Callout 
                  tooltip={true}
                  onPress={() => handleNavigateToOrphanageDetails(orphanage.id) }
                >
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>
                      {orphanage.name}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            );
          })
        }
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
            {
              orphanages.length === 0 ? (`Nenhum orfanato encontrado`)
              : orphanages.length > 1 
                ? (`${orphanages.length} orfanatos encontrados.`) 
                : (`${orphanages.length} orfanato encontrado.`)
            }
        </Text>
        <RectButton 
          style={styles.createOrphanageBotton}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather 
            name={"plus"}
            size={20}
            color={"#FFF"}
          ></Feather>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,// +26.5
  },
  
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: "center",

  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
  },

  footer:{
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height:56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },
  
  footerText:{
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3',
  },

  createOrphanageBotton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
