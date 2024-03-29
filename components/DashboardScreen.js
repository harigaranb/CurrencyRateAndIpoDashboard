import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setErrorMessage } from "../redux/authActions";
import { API_KEY } from '@env';

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [mostActiveStocks, setMostActiveStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMostActiveStocks();
  }, []);

  const fetchMostActiveStocks = async () => {
    try {
      const response = await axios.get(
        `https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=${API_KEY}`
      );

      setMostActiveStocks(response.data);
    } catch (error) {
      dispatch(setErrorMessage("Error fetching stock data."));
    } finally {
      setLoading(false);
    }
  };

  const renderStockCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.stockName}>
        {item.companyName} {item.symbol}
      </Text>
      <Text
        style={styles.latestPrice}
      >{`Fund Managers: ${item.managers}`}</Text>
      <Text
        style={styles.latestPrice}
      >{`Shares Available: ${item.shares}`}</Text>
      <Text style={styles.latestPrice}>{`Volume: ${item.volume}`}</Text>
      <Text
        style={styles.latestPrice}
      >{`Highest Price Range: $ ${item.priceRangeHigh}`}</Text>
      <Text
        style={styles.latestPrice}
      >{`Lowest Price Range: $ ${item.priceRangeLow}`}</Text>
      <Text style={styles.changePrice}>{`Issued Date: ${item.filedDate}`}</Text>
      <Text
        style={styles.changePrice}
      >{`Offering Date: ${item.offeringDate}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <FlatList
          data={mostActiveStocks}
          keyExtractor={(item) => item.symbol}
          renderItem={renderStockCard}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  stockName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  latestPrice: {
    fontSize: 16,
    marginTop: 8,
  },
  changePrice: {
    fontSize: 16,
    color: "green",
    marginTop: 4,
  },
});

export default DashboardScreen;
