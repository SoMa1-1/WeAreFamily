package com.waf.soma.wearefamily;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.FragmentActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONObject;

import java.util.Vector;

public class SignupActivity extends FragmentActivity implements OnTaskCompleted {

    final String posturl="http://172.16.100.56:3000/pairing";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        Spinner posSpinner = (Spinner) findViewById(R.id.posSpinner);
        ArrayAdapter adapter = ArrayAdapter.createFromResource(
                this,R.array.position, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        posSpinner.setAdapter(adapter);


        Button btnSignup = (Button) findViewById(R.id.btnSignup);


        btnSignup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                EditText editPIN = (EditText)findViewById(R.id.editPIN);
                EditText editName = (EditText)findViewById(R.id.editName);

                if(editName.getText().toString().equals("")) {
                    //이름이 비어있음
                    Toast.makeText(getApplicationContext(),"이름을 입력해주세요.",Toast.LENGTH_SHORT).show();
                    return;
                }

                String url="http://172.16.100.56:3000/tv?code="+editPIN.getText().toString();
                Log.i("pin url test", url);

                //get을 보내어 결과값은 아래의 onTaskCompleted 메소드를 통해 받는다
                try {
                    GetTask gettask = new GetTask(SignupActivity.this);
                    gettask.execute(url);
                }
                catch(Exception e){
                    Toast.makeText(getApplicationContext(),"네트워크 연결을 확인하시거나 나중에 다시 시도해 주세요.",Toast.LENGTH_SHORT).show();
                    e.printStackTrace();
                }
            }
        });
    }

    //GetTask의 리턴값을 파라미터로 가지며 실행되는 메소드
    @Override
    public void onTaskCompleted(String value) {

        Log.i("onTaskCompleted",value);

        try {
            JSONObject json;
            json = new JSONObject(value);

            if(json.getJSONArray("results").length()==0){
                Toast.makeText(getApplicationContext(),"PIN번호가 유효하지 않습니다.",Toast.LENGTH_SHORT).show();
                return;
            }

            EditText editPIN = (EditText)findViewById(R.id.editPIN);
            EditText editName = (EditText)findViewById(R.id.editName);
            Spinner posSpinner = (Spinner) findViewById(R.id.posSpinner);

            SharedPreferences setting;
            setting = getSharedPreferences("setting", 0);

            Vector<NameValuePair> nameValue = new Vector<NameValuePair>();
            nameValue.add(new BasicNameValuePair("url", posturl+"?m_duid="+setting.getString("token","")));

            nameValue.add(new BasicNameValuePair("t_duid", json.getJSONArray("results").getJSONObject(0).getString("t_duid")));
            nameValue.add(new BasicNameValuePair("ip", json.getJSONArray("results").getJSONObject(0).getString("ip")));
            nameValue.add(new BasicNameValuePair("duration", json.getJSONArray("results").getJSONObject(0).getString("duration")));

            nameValue.add(new BasicNameValuePair("relation", posSpinner.getSelectedItem().toString()));
            nameValue.add(new BasicNameValuePair("name", editName.getText().toString()));
            nameValue.add(new BasicNameValuePair("m_duid", setting.getString("token","")));

            new HttpTask().execute(nameValue);

            DialogFragment dialog = new PolicyDialog();
            dialog.show(getSupportFragmentManager(), "PolicyDialog");
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_signup, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
