package com.usmpapp

import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.usmpapp.IziPay
import dagger.hilt.android.AndroidEntryPoint

class IziPayModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    @ReactMethod
    fun launchSdkActivity(
        environment: String,
        action: String,
        publicKey: String,
        transactionId: String,
        merchantCode: String,
        facilitatorCode: String,
        orderNumber: String,
        currency: String,
        amount: String,
        payMethod: String,
        channel: String,
        processType: String,
        merchantBuyerId: String,
        dateTime: String,
        cardToken: String,
        firstName: String,
        lastName: String,
        email: String,
        phoneNumber: String,
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
        documentType: String,
        document: String,
        language: String,
        isAmountLabelVisible: Boolean,
        isLangControlVisible: Boolean,
        showMessageResult: Boolean,
        theme: String,
        payButtonBackgroundColor: String,
        textInputBorderColor: String,
        textInputPlaceholderTextColor: String,
        logo: String,
        urlIpn: String,
        promise: Promise
    ) {
        val activity = currentActivity

        if (activity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist")
            return
        }
        activityPromise = promise
        try {
            val intent = Intent(activity, IziPay::class.java);
            intent.putExtra("ENV", environment)
            intent.putExtra("ACTION", action)
            intent.putExtra("KEY", publicKey)
            intent.putExtra("TRANSACTION_ID", transactionId)
            intent.putExtra("MERCHANT_CODE", merchantCode)
            intent.putExtra("FACILITATOR_CODE", facilitatorCode)
            intent.putExtra("ORDER_NUMBER", orderNumber)
            intent.putExtra("CURRENCY", currency)
            intent.putExtra("AMOUNT", amount)
            intent.putExtra("PAY_METHOD", payMethod)
            intent.putExtra("CHANNEL", channel)
            intent.putExtra("PROCESS_TYPE", processType)
            intent.putExtra("MERCHANT_BUYER_ID", merchantBuyerId)
            intent.putExtra("DATE_TIME", dateTime)
            intent.putExtra("CARD_TOKEN", cardToken)
            intent.putExtra("FIRST_NAME", firstName)
            intent.putExtra("LAST_NAME", lastName)
            intent.putExtra("EMAIL", email)
            intent.putExtra("PHONE_NUMBER", phoneNumber)
            intent.putExtra("STREET", street)
            intent.putExtra("CITY", city)
            intent.putExtra("STATE", state)
            intent.putExtra("COUNTRY", country)
            intent.putExtra("POSTAL_CODE", postalCode)
            intent.putExtra("DOCUMENT_TYPE", documentType)
            intent.putExtra("DOCUMENT", document)
            intent.putExtra("LANGUAGE", language)
            intent.putExtra("IS_AMOUNT_LABEL_VISIBLE", isAmountLabelVisible)
            intent.putExtra("IS_LANG_CONTROL_VISIBLE", isLangControlVisible)
            intent.putExtra("SHOW_MESSAGE_RESULT", showMessageResult)
            intent.putExtra("THEME", theme)
            intent.putExtra("PAY_BUTTON_BACKGROUND_COLOR", payButtonBackgroundColor)
            intent.putExtra("TEXT_INPUT_BORDER_COLOR", textInputBorderColor)
            intent.putExtra("TEXT_INPUT_PLACEHOLDER_TEXT_COLOR", textInputPlaceholderTextColor)
            intent.putExtra("LOGO", logo)
            intent.putExtra("URL_IPN", urlIpn)
            Log.d("prueba ","IziPay")
            //intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP//recien añadido si no funciona borrar
            activity.startActivity(intent)


        } catch (t: Throwable) {
            activityPromise?.reject(E_FAILED_TO_SHOW_ACTIVITY, t)
            activityPromise = null
        }
    }

    companion object {
        const val E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST"
        const val E_FAILED_TO_SHOW_ACTIVITY = "E_FAILED_TO_SHOW_ACTIVITY"

        // Método estático para manejar el resultado recibido desde la actividad
        private var activityPromise: Promise? = null
        @JvmStatic
        fun handleActivityResult(payload: String) {
            activityPromise?.let {
                it.resolve(payload)
                activityPromise = null
            }

        }
    }

    override fun getName() = "IziPayModule"
}