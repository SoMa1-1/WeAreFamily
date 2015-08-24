package com.waf.soma.wearefamily.GCM;

/**
 * Created by kimseungchul on 2015. 8. 11..
 */
import android.content.Intent;

import com.google.android.gms.iid.InstanceIDListenerService;


public class MyInstanceIDListenerService extends InstanceIDListenerService {

    private static final String TAG = "MyInstanceIDLS";

    @Override
    public void onTokenRefresh() {
        Intent intent = new Intent(this, RegistrationIntentService.class);
        startService(intent);
    }
}