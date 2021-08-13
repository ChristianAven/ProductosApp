import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { ProductsContext } from '../context/ProductsContext';
import { ProductsStackParams } from '../navigator/ProductsNavigator';


interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> { };

const ProductsScreen = ({navigation}: Props) => {
    
    const { products, loadProducts } = useContext( ProductsContext );
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('ProductScreen', {})}
                    style={{marginRight: 10}}
                >
                    <Text>Agregar</Text>
                </TouchableOpacity>
            )
        })

    }, []);

    const loadProductsFromBackend = async() => {
        setRefreshing(true);
        await loadProducts();
        setRefreshing(false);
    }


    return (
        <View style={{flex: 1, marginHorizontal: 10}}>
            <FlatList
                data={products}
                keyExtractor={(p) => p._id}
                renderItem={ ({item}) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={
                            () => navigation.navigate('ProductScreen', {
                                id: item._id,
                                name: item.nombre,
                            })
                        
                        }
                    >
                        <Text style={styles.productName}>{item.nombre}</Text>
                    </TouchableOpacity>
                ) }

                ItemSeparatorComponent={ () => (
                    <View style={styles.itemSeparator}/>
                ) }

                refreshControl={
                    <RefreshControl
                        onRefresh={loadProductsFromBackend}
                        refreshing={refreshing}
                    />
                }
            />
        </View>
    )
};

const styles = StyleSheet.create({
    productName: {
        fontSize: 20
    },
    itemSeparator: {
        borderBottomWidth: 2,
        marginVertical: 5,
        borderBottomColor: 'rgba(0,0,0,0.1)'
    }
});

export default ProductsScreen;
