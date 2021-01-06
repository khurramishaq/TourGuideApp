import React from 'react';
import { View, ActivityIndicator, Modal, StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from '../../utils/colors';
export default Loading = ({ loading }) => {
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
        >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={loading}
                        size="large"
                        color={PRIMARY_COLOR}
                    />
                </View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});