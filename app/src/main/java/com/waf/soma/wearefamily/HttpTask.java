package com.waf.soma.wearefamily;

import android.os.AsyncTask;
import android.util.Log;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.HTTP;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.Vector;

/**
 * Created by Abj on 2015. 8. 8..
 */
public class HttpTask extends AsyncTask<Vector<NameValuePair>,Void,String> {

    private final String TAG = "HttpTest";
    private String urlPath;

    @Override
    protected String doInBackground(Vector<NameValuePair>... nv) {

        try{
            urlPath = new String(nv[0].elementAt(0).getValue());
            Log.i(TAG,urlPath);

            HttpPost request = new HttpPost(urlPath);

            //웹 접속 - utf-8 방식으로
            HttpEntity enty = new UrlEncodedFormEntity(nv[0], HTTP.UTF_8);
            request.setEntity(enty);

            HttpClient client = new DefaultHttpClient();
            HttpResponse res = client.execute(request);
            //웹 서버에서 값받기
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
        }catch(UnsupportedEncodingException e){
            e.printStackTrace();
        }catch(IOException e){
            e.printStackTrace();
        }catch(IllegalArgumentException e){
            e.printStackTrace();
        }
        //오류시 null 반환
        return "";
    }

    //asyonTask 3번째 인자와 일치 매개변수값 -> doInBackground 리턴값이 전달됨
    //AsynoTask 는 preExcute - doInBackground - postExecute 순으로 자동으로 실행됩니다.
    //ui는 여기서 변경
    protected void onPostExecute(String value){
        super.onPostExecute(value);
        Log.i(TAG, value);
    }

}
