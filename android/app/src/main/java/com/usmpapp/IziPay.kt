package com.usmpapp

import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import androidx.activity.result.contract.ActivityResultContracts
import androidx.annotation.RequiresApi
import com.usmpapp.IziPayModule
import com.usmpapp.R
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.izipay.izipay_pw_sdk.model.data.*
import com.izipay.izipay_pw_sdk.model.domain.PaymentResponse
import com.izipay.izipay_pw_sdk.ui.ContainerActivity

class IziPay : AppCompatActivity() {
    private lateinit var env: String
    private lateinit var action: String
    private lateinit var key: String
    private lateinit var transactionId: String
    private lateinit var merchantCode: String
    private lateinit var facilitatorCode: String
    private lateinit var orderNumber: String
    private lateinit var currency: String
    private lateinit var amount: String
    private lateinit var payMethod: String
    private lateinit var channel: String
    private lateinit var processType: String
    private lateinit var merchantBuyerId: String
    private lateinit var dateTime: String
    private lateinit var cardToken: String
    private lateinit var firstName: String
    private lateinit var lastName: String
    private lateinit var email: String
    private lateinit var phoneNumber: String
    private lateinit var street: String
    private lateinit var city: String
    private lateinit var state: String
    private lateinit var country: String
    private lateinit var postalCode: String
    private lateinit var documentType: String
    private lateinit var document: String
    private lateinit var language: String
    private var isAmountLabelVisible = true
    private var isLangControlVisible = true
    private var showMessageResult = true
    private lateinit var theme: String
    private lateinit var payButtonBackgroundColor: String
    private lateinit var textInputBorderColor: String
    private lateinit var textInputPlaceholderTextColor: String
    private lateinit var logo: String
    private lateinit var urlIpn: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_izi_pay)
       Log.d("oncreate2","es oncreate")
    }

    override fun onResume() {
        super.onResume()
        Log.d("onResume2","es onResume")

        env = intent.getStringExtra("ENV").toString();
        action = intent.getStringExtra("ACTION").toString();
        key = intent.getStringExtra("KEY").toString();
        transactionId = intent.getStringExtra("TRANSACTION_ID").toString();
        merchantCode = intent.getStringExtra("MERCHANT_CODE").toString();
        facilitatorCode = intent.getStringExtra("FACILITATOR_CODE").toString();
        orderNumber = intent.getStringExtra("ORDER_NUMBER").toString();
        currency = intent.getStringExtra("CURRENCY").toString();
        amount = intent.getStringExtra("AMOUNT").toString();
        payMethod = intent.getStringExtra("PAY_METHOD").toString();
        channel = intent.getStringExtra("CHANNEL").toString();
        processType = intent.getStringExtra("PROCESS_TYPE").toString();
        merchantBuyerId = intent.getStringExtra("MERCHANT_BUYER_ID").toString();
        dateTime = intent.getStringExtra("DATE_TIME").toString();
        cardToken = intent.getStringExtra("CARD_TOKEN").toString();
        firstName = intent.getStringExtra("FIRST_NAME").toString();
        lastName = intent.getStringExtra("LAST_NAME").toString();
        email = intent.getStringExtra("EMAIL").toString();
        phoneNumber = intent.getStringExtra("PHONE_NUMBER").toString();
        street = intent.getStringExtra("STREET").toString();
        city = intent.getStringExtra("CITY").toString();
        state = intent.getStringExtra("STATE").toString();
        country = intent.getStringExtra("COUNTRY").toString();
        postalCode = intent.getStringExtra("POSTAL_CODE").toString();
        documentType = intent.getStringExtra("DOCUMENT_TYPE").toString();
        document = intent.getStringExtra("DOCUMENT").toString();
        language = intent.getStringExtra("LANGUAGE").toString();
        isAmountLabelVisible = intent.getBooleanExtra("IS_AMOUNT_LABEL_VISIBLE", true);
        isLangControlVisible = intent.getBooleanExtra("IS_LANG_CONTROL_VISIBLE", true);
        showMessageResult = intent.getBooleanExtra("SHOW_MESSAGE_RESULT", true);
        theme = intent.getStringExtra("THEME").toString();
        payButtonBackgroundColor = intent.getStringExtra("PAY_BUTTON_BACKGROUND_COLOR").toString();
        textInputBorderColor = intent.getStringExtra("TEXT_INPUT_BORDER_COLOR").toString();
        textInputPlaceholderTextColor =
            intent.getStringExtra("TEXT_INPUT_PLACEHOLDER_TEXT_COLOR").toString();
        logo = intent.getStringExtra("LOGO").toString();
        urlIpn = intent.getStringExtra("URL_IPN").toString();
        val transactionId2 =System.currentTimeMillis().toString();
        val request = ConfigRequest(
            env,
            action,
            key,
            transactionId2, //tran
            merchantCode,
            facilitatorCode,
            OrderPaymentIzipay(
                orderNumber, //order number
                currency,
                amount,
                payMethod,
                channel,
                processType,
                merchantBuyerId,
                System.currentTimeMillis().toString(), //fecha se queda así
            ),
            TokenPaymentIzipay(""),
            BillingPaymentIzipay(
                firstName,
                lastName,
                email,
                phoneNumber,
                street,
                city,
                state,
                country,
                postalCode,
                documentType,
                document
            ),
            ShippingPaymentIzipay(
                firstName,
                lastName,
                email,
                phoneNumber,
                street,
                city,
                state,
                country,
                postalCode,
                documentType,
                document
            ), // not required
            AppearencePaymentIzipay(
                language,
                AppearenceControlsPaymentIzipay(
                    isAmountLabelVisible,
                    isLangControlVisible,
                ),
                AppearenceVisualSettingsPaymentIzipay(
                    showMessageResult
                ),
                theme,
                CustomThemePaymentIzipay(
                    payButtonBackgroundColor,
                    textInputBorderColor,
                    textInputPlaceholderTextColor,
                ),
                logo
            ),
            urlIpn
        )
        val intentSDK = Intent(this, ContainerActivity::class.java).apply {
            putExtra(ContainerActivity.REQUEST, request)
            //flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
        }
        Log.d("estamos en 3 ", "fecha hoy ${transactionId} ")
        responseLauncher.launch(intentSDK)
    }



    private val responseLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            Log.d("responseLaun", "responseLauncher")
            val dataSignature =
                result.data?.getStringExtra(ContainerActivity.RESPONSESIGNTURE).orEmpty()
            val dataPayLoad: PaymentResponse = Gson().fromJson(
                result.data?.getStringExtra(ContainerActivity.RESPONSEPAYLOAD).orEmpty(),
                object : TypeToken<PaymentResponse>() {}.type
            )
            val timeStamp = System.currentTimeMillis().toString()
            val gson = Gson();
            val dataPayloadJson = gson.toJson(dataPayLoad)

            if (result.resultCode == AppCompatActivity.RESULT_OK) {
                val response = "$timeStamp :: $dataPayLoad->$dataSignature"
                IziPayModule.handleActivityResult(dataPayloadJson);
            } else {
                val response = "$timeStamp :: $dataPayLoad->$dataSignature"
                IziPayModule.handleActivityResult(dataPayloadJson);
            }
            finish()
        }
}