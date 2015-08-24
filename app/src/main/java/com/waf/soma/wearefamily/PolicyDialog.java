package com.waf.soma.wearefamily;

/**
 * Created by kimseungchul on 15. 8. 15..
 */


import android.app.Dialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.support.v7.app.AlertDialog;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;

public class PolicyDialog extends DialogFragment {
    

        @Override
        public Dialog onCreateDialog(Bundle savedInstanceState) {
            AlertDialog.Builder mBuilder = new AlertDialog.Builder(getActivity());
            LayoutInflater mLayoutInflater = getActivity().getLayoutInflater();
            View view = mLayoutInflater.inflate(R.layout.dialog_policy, null);
            mBuilder.setView(view);
            mBuilder.setTitle("개인정보수집동의");

            Button btnAgree = (Button) view.findViewById(R.id.btnAgree);
            btnAgree.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    dismiss();

                    Intent myIntent = new Intent(getActivity(), MainActivity.class);
                    startActivity(myIntent);

                    getActivity().finish();
                }
            });

            return mBuilder.create();
        }

        @Override
        public void onStop() {
            super.onStop();
        }
    }


