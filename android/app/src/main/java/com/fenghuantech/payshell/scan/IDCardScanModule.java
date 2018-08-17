package com.fenghuantech.payshell.scan;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.fenghuantech.payshell.utils.Constants;
import com.fenghuantech.payshell.utils.ImageUtils;
import com.idcard.view.PhotographActivity;

import java.util.HashMap;
import java.util.Map;

import io.reactivex.functions.Consumer;

import static android.app.Activity.RESULT_OK;

/**
 * Created by lhk on 2018/6/9.
 */

public class IDCardScanModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    private static final String TAG = "Card";
    private static final String ID_CARD_FRONT_IMAGE = "idCardFrontImage";
    private static final String ID_CARD_BACK_IMAGE = "idCardBackImage";
    private static final String ID_HOLD_CARD_IMAGE = "idCardHoldPhoto";
    private static final String ID_CARD_NO = "idCardNo";
    private static final String SCAN_CARD_FRONT = "front";
    private static final String SCAN_CARD_BACK = "back";
    private static final String SCAN_HOLD_CARD = "hold";
    private Activity mActivity;
    private Promise mPromise;

    @Override
    public String getName() {
        return "IDCardScanModule";
    }

    public IDCardScanModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(SCAN_CARD_FRONT, Constants.SCAN_ID_CARD_FRONT_CODE);
        constants.put(SCAN_CARD_BACK, Constants.SCAN_ID_CARD_BACK_CODE);
        constants.put(SCAN_HOLD_CARD, Constants.SCAN_ID_HOLD_CARD_CODE);
        return constants;
    }

    @ReactMethod
    public void scanIdCard(int requestCode, Promise promise) {
        this.mPromise = promise;
        mActivity = getCurrentActivity();
        takePicture(requestCode);
    }

    private void takePicture(int requestCode) {
        Intent intent = new Intent(this.mActivity, PhotographActivity.class);
        Log.d(TAG, "" + requestCode);
        this.mActivity.startActivityForResult(intent, requestCode);
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        Log.d(TAG, "requestCode: " + requestCode + "; resultCode: " + requestCode);
        switch (requestCode) {
            case Constants.SCAN_ID_CARD_FRONT_CODE:
                frontCardImage(resultCode, data);
                break;
            case Constants.SCAN_ID_CARD_BACK_CODE:
                backCardImage(resultCode, data);
                break;
            case Constants.SCAN_ID_HOLD_CARD_CODE:
                holdCardImage(resultCode, data);
                break;
            default:
                break;
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    private void cancel() {
        if (mPromise != null) {
            mPromise.reject(new Exception("拍照异常"));
        } else {
            Log.d(TAG, "mPromise为null");
        }
    }

    private void frontCardImage(int resultCode, Intent data) {
        //获取身份证正面图片及身份证号
        if (data == null) {
            cancel();
            return;
        }
        Bundle extras = data.getExtras();

        if (resultCode == RESULT_OK && extras != null) {
            String idCardFrontPath = extras.getString("maximgPath");
            final String idcardValue = extras.getString("IDcardValue");
            if (!TextUtils.isEmpty(idCardFrontPath)) {
                BitmapFactory.Options options = new BitmapFactory.Options();
                options.inPreferredConfig = Bitmap.Config.RGB_565;
                Bitmap bitmap = BitmapFactory.decodeFile(idCardFrontPath, options);
                String filename = String.valueOf(System.currentTimeMillis()) + ".jpg";
                ImageUtils.compressAndSave(bitmap, filename, this.mActivity)
                        .subscribe(new Consumer<Uri>() {
                            @Override
                            public void accept(Uri path) {
                                Log.d(TAG, path.toString());
                                WritableMap map = Arguments.createMap();
                                map.putString(ID_CARD_FRONT_IMAGE, path.toString());
                                map.putString(ID_CARD_NO, idcardValue);
                                IDCardScanModule.this.mPromise.resolve(map);
                            }
                        });
            } else {
                cancel();
            }
        } else {
            cancel();
        }
    }

    private void backCardImage(int resultCode, Intent data) {
        if (data == null) {
            cancel();
            return;
        }
        Bundle extras = data.getExtras();

        if (resultCode == RESULT_OK && extras != null) {
            //获取身份证背面图片
            String idCardBackPath = extras.getString("maximgPath");
            if (!TextUtils.isEmpty(idCardBackPath)) {
                BitmapFactory.Options options = new BitmapFactory.Options();
                options.inPreferredConfig = Bitmap.Config.RGB_565;
                Bitmap bitmap = BitmapFactory.decodeFile(idCardBackPath, options);
                String filename = String.valueOf(System.currentTimeMillis()) + ".jpg";
                ImageUtils.compressAndSave(bitmap, filename, this.mActivity)
                        .subscribe(new Consumer<Uri>() {
                            @Override
                            public void accept(Uri path) {
                                Log.d(TAG, path.toString());
                                WritableMap map = Arguments.createMap();
                                map.putString(ID_CARD_BACK_IMAGE, path.toString());
                                IDCardScanModule.this.mPromise.resolve(map);
                            }
                        });
            } else {
                cancel();
            }
        } else {
            cancel();
        }
    }

    private void holdCardImage(int resultCode, Intent data) {
        if (data == null) {
            cancel();
            return;
        }

        Bundle extras = data.getExtras();
        if (resultCode == RESULT_OK && extras != null) {
            //获取手持身份证图片
            String idHoldCardPath = extras.getString("maximgPath");
            if (!TextUtils.isEmpty(idHoldCardPath)) {
                BitmapFactory.Options options = new BitmapFactory.Options();
                options.inPreferredConfig = Bitmap.Config.RGB_565;
                Bitmap bitmap = BitmapFactory.decodeFile(idHoldCardPath, options);
                String filename = String.valueOf(System.currentTimeMillis()) + ".jpg";
                ImageUtils.compressAndSave(bitmap, filename, this.mActivity)
                        .subscribe(new Consumer<Uri>() {
                            @Override
                            public void accept(Uri path) {
                                Log.d(TAG, path.toString());
                                WritableMap map = Arguments.createMap();
                                map.putString(ID_HOLD_CARD_IMAGE, path.toString());
                                IDCardScanModule.this.mPromise.resolve(map);
                            }
                        });
            } else {
                cancel();
            }
        } else {
            cancel();
        }
    }
}

