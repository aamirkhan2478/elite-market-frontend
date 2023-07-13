import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(currentPage - 1);

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
      onPageChange(currentPageIndex);
    }
  };

  const goToNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
      onPageChange(currentPageIndex + 2);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={goToPreviousPage}
        disabled={currentPageIndex === 0}
      >
        <Text style={styles.arrowText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.pageNumber}>
        Page {currentPage} of {totalPages}
      </Text>
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={goToNextPage}
        disabled={currentPageIndex === totalPages - 1}
      >
        <Text style={styles.arrowText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius:20
  },
  arrowButton: {
    padding: 5,
  },
  arrowText: {
    fontSize: 20,
  },
  pageNumber: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default Pagination;
