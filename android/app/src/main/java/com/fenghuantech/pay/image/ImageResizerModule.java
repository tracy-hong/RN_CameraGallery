package com.fenghuantech.pay.image;

import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.fenghuantech.pay.utils.ImageUtils;

import java.io.File;
import java.net.URI;
import java.net.URISyntaxException;

import io.reactivex.functions.Consumer;


/**
 * Created by lhk on 2018/6/9.
 */

public class ImageResizerModule extends ReactContextBaseJavaModule {
    private static final String TAG = "Card";
    private static final String IMAGE_PATH = "image_path";
    private Activity mActivity;
    private Promise mPromise;

    @Override
    public String getName() {
        return "ImageResizerModule";
    }

    public ImageResizerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void resize(String path, Promise promise) {
        this.mPromise = promise;
        mActivity = getCurrentActivity();
        compress(path);
    }

    private void compress(String path) {
        BitmapFactory.Options options = new BitmapFactory.Options();
        options.inPreferredConfig = Bitmap.Config.RGB_565;
        Bitmap bitmap = BitmapFactory.decodeFile(path, options);
        int width = bitmap.getWidth();
        int height = bitmap.getHeight();
        if (width < height) {
            bitmap = ImageUtils.rotaingImageView(90, bitmap);
        }
        String filename = String.valueOf(System.currentTimeMillis()) + ".jpg";
        ImageUtils.compressAndSave(bitmap, filename, this.mActivity)
                .subscribe(new Consumer<Uri>() {
                    @Override
                    public void accept(Uri path) {
                        Log.d(TAG, path.toString());
                        try {
                            File file = new File(new URI(path.toString()));
                            Log.e("FileSize:", "filesize: " + file.length() / 1024);
                        } catch (URISyntaxException e) {
                            e.printStackTrace();
                        }
                        
                        WritableMap map = Arguments.createMap();
                        map.putString(IMAGE_PATH, path.toString());
                        ImageResizerModule.this.mPromise.resolve(map);
                    }
                });
    }


}

