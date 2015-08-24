package com.waf.soma.wearefamily;

import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.location.LocationProvider;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

import java.util.Vector;

public class MainService extends Service {

    LocationManager mLocMan;
    String mProvider;
    String TAG="service";
    final String url="http://172.16.100.56:3000/gps";
    final String url2="http://172.16.100.56:3000/lock";
    int mCount;

    private BroadcastReceiver lockReceiver = new BroadcastReceiver() {

        @Override
        public void onReceive(Context context, Intent intent) {

        SharedPreferences setting;
        setting = getSharedPreferences("setting", 0);

        if (intent.getAction().equals(Intent.ACTION_SCREEN_ON)) {

            //서버로 현재 시간 전송
            Vector<NameValuePair> nameValue = new Vector<NameValuePair>();
            nameValue.add(new BasicNameValuePair("url", url2));
            nameValue.add(new BasicNameValuePair("m_duid", setting.getString("token","")));
            nameValue.add(new BasicNameValuePair("event", "1"));

            new HttpTask().execute(nameValue);
        }
        if (intent.getAction().equals(Intent.ACTION_SCREEN_OFF)) {

            //서버로 현재 시간 전송
            Vector<NameValuePair> nameValue = new Vector<NameValuePair>();
            nameValue.add(new BasicNameValuePair("url", url2));
            nameValue.add(new BasicNameValuePair("m_duid", setting.getString("token","")));
            nameValue.add(new BasicNameValuePair("event", "0"));

            new HttpTask().execute(nameValue);
        }
        }
    };

    @Override
    public void onCreate() {
        super.onCreate();

        Log.i(TAG, "MainService onCreate 호출");

        registerBR();

        mLocMan = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        mProvider = mLocMan.getBestProvider(new Criteria(),true);
        mLocMan.requestLocationUpdates(mProvider, 3000, 10, mListener);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent == null)
            registerBR();
        return START_STICKY;
    }

    LocationListener mListener = new LocationListener(){
        public void onLocationChanged(Location location){
            mCount++;
            String sloc = String.format("수신회수:%d 위도:%f 경도:%f",
                    mCount,location.getLatitude(),location.getLongitude());
            Log.i(TAG,sloc);

            SharedPreferences setting;
            setting = getSharedPreferences("setting", 0);

            //서버로 위치정보 post
            Vector<NameValuePair> nameValue = new Vector<NameValuePair>();
            nameValue.add(new BasicNameValuePair("url", url+"?m_duid="+setting.getString("token","")));
            nameValue.add(new BasicNameValuePair("m_duid", setting.getString("token","")));
            nameValue.add(new BasicNameValuePair("lat", Double.toString(location.getLatitude())));
            nameValue.add(new BasicNameValuePair("lon", Double.toString(location.getLongitude())));

            new HttpTask().execute(nameValue);

        }
        public void onProviderDisabled(String provider){
            Log.i(TAG,"현재 상태 : 서비스 사용 불가");
        }

        public void onProviderEnabled(String provider){
            Log.i(TAG,"현재 상태 : 서비스 사용 가능");
        }

        public void onStatusChanged(String provider,int status,Bundle extras){
            String sStatus="";
            switch(status){
                case LocationProvider.OUT_OF_SERVICE:
                    sStatus="범위 벗어남";
                    break;
                case LocationProvider.TEMPORARILY_UNAVAILABLE:
                    sStatus="범위 벗어남";
                    break;
                case LocationProvider.AVAILABLE:
                    sStatus="사용 가능";
                    break;
            }
            Log.i(TAG, provider+"상태 변경 : "+sStatus);
        }
    };

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        //throw new UnsupportedOperationException("Not yet implemented");

        return null;
    }

    @Override
    public void onDestroy(){
        super.onDestroy();
        unregisterReceiver(lockReceiver);
    }

    private void registerBR() {
        IntentFilter filter = new IntentFilter(Intent.ACTION_SCREEN_ON);
        filter.addAction(Intent.ACTION_SCREEN_OFF);
        registerReceiver(lockReceiver, filter);
    }
}
