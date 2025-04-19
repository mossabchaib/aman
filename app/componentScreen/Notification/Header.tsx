import { useThemeColors } from '@/app/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BlurView } from "expo-blur";
import { globalStyles } from '@/app/utils/Fonts';
import { useTranslation } from 'react-i18next'; // إضافة useTranslation

export default function Header({mode}:any) {
    const Colors: any = useThemeColors(mode||"light");
    const { t } = useTranslation(); 

    return (
        <BlurView intensity={60} style={styles.header}>
            <View style={styles.logoContainer}>
                <TouchableOpacity>
                    <View style={styles.logoCircle}>
                        <Ionicons name="arrow-back" size={25} color={Colors.text} />
                    </View>
                </TouchableOpacity>
                <Text style={[styles.logoText, { color: Colors.text }, globalStyles.text]}>
                    {t('headerNotification.notification')} 
                </Text>
            </View>
        </BlurView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.05)",
        position: "absolute", // بدلاً من fixed
        top: 0, // يثبته في أعلى الشاشة
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 1000,
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    logoCircle: {
        width: 22,
        height: 22,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },
    logoText: {
        fontSize: 25,
        fontWeight: "500",
    },
    headerIcons: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconButton: {
        marginLeft: 16,
        position: "relative",
        padding: 4,
    },
    badge: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
    },
    badgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: "500",
    },
});