import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeColors } from '../utils/colors';
import { globalStyles } from '../utils/Fonts';
import { BlurView } from "expo-blur";
import { I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function Header({mode}:any) {
    const Colors: any = useThemeColors(mode||"light");
    const { t } = useTranslation();
    return (
        <BlurView intensity={50} style={[styles.header, { backgroundColor: Colors.background }]}>
            {/* الشعار */}
            <View style={styles.logoContainer}>
                <View style={[styles.logoCircle, { backgroundColor: "none" }]}>
                    <Ionicons name="leaf" size={25} color={Colors.primary} />
                </View>
                <Text style={[styles.logoText, { color: Colors.text }, globalStyles.text]}>
                    {t('header.logo')} {/* استخدام الترجمة */}
                </Text>
            </View>

            {/* أيقونة الإشعارات */}
            <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="notifications-outline" size={30} color={Colors.text} />
                    <View style={[styles.badge, { backgroundColor: Colors.danger }]}>
                        <Text style={[styles.badgeText, globalStyles.text]}>5</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </BlurView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row", // عكس الاتجاه في حالة RTL
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.05)",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 1000,
    },
    logoContainer: {
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row", // عكس الاتجاه في حالة RTL
        alignItems: "center",
    },
    logoCircle: {
        width: 22,
        height: 22,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginRight: I18nManager.isRTL ? 0 : 8, // تعديل الهامش بناءً على الاتجاه
        marginLeft: I18nManager.isRTL ? 8 : 0,
    },
    logoText: {
        fontSize: 25,
        fontWeight: "500",
        textAlign: I18nManager.isRTL ? "right" : "left", // ضبط اتجاه النص
    },
    headerIcons: {
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row", // عكس الاتجاه في حالة RTL
        alignItems: "center",
    },
    iconButton: {
        marginLeft: I18nManager.isRTL ? 0 : 16, // تعديل الهامش بناءً على الاتجاه
        marginRight: I18nManager.isRTL ? 16 : 0,
        position: "relative",
        padding: 4,
    },
    badge: {
        position: "absolute",
        top: 0,
        right: I18nManager.isRTL ? "auto" : 0, // تعديل الموقع بناءً على الاتجاه
        left: I18nManager.isRTL ? 0 : "auto",
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
        textAlign: I18nManager.isRTL ? "right" : "left", // ضبط اتجاه النص
    },
});