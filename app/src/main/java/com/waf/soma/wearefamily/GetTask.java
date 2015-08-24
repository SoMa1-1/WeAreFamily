package com.waf.soma.wearefamily;

import android.os.AsyncTask;
import android.util.Log;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.HTTP;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * Created by Abj on 15. 8. 18..
 */

public class GetTask extends AsyncTask<String,Void,String> { //change Object to required type
    private OnTaskCompleted listener;

    public GetTask(OnTaskCompleted listener){
        this.listener=listener;
    }

    private final String TAG = "GetTest";
    private String urlPath;

    @Override
    protected String doInBackground(String... url) {
        try {
            urlPath=url[0];
            HttpClient client = new DefaultHttpClient();
            HttpGet get = new HttpGet(urlPath);
            HttpResponse res = client.execute(get);
            HttpEntity entityResponse = res.getEntity();
            InputStream im = entityResponse.getContent();
            BufferedReader reader = new BufferedReader(new InputStreamReader(im, HTTP.UTF_8));

            String total = "";
            String tmp = "";
            //버퍼에있는거 전부 더해주기
            //readLine -> 파일내용을 줄 단위로 읽기
            while((tmp = reader.readLine())!= null)
            {
                if(tmp != null)
                {
                    total += tmp;
                }
            }
            im.close();
            //결과창뿌려주기 - ui 변경시 에러
            //result.setText(total);
            return total;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    protected void onPostExecute(String value){
        super.onPostExecute(value);
        Log.i(TAG+"A", value);
        listener.onTaskCompleted(value);
    }
}