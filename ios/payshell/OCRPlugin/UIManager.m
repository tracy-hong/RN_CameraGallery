//
//  UIManager.m
//  qipay
//
//  Created by wyht－ios－dev on 2018/3/12.
//  Copyright © 2018年 qitech. All rights reserved.
//

#import "UIManager.h"

@implementation UIManager

static UIManager *instance = nil;

+(instancetype) getInstance {
    if(instance==nil)
    {
        static dispatch_once_t onceToken;
        dispatch_once(&onceToken, ^{
            instance = [[self alloc] init];
        });
    }
    return instance;
}

+(NSString *) ImageResize:(NSString *)imgUrl {
    imgUrl=[imgUrl substringFromIndex:[@"file:///private/" length]];
    UIImage *img=[UIImage imageWithData:[NSData dataWithContentsOfFile:imgUrl]];
    UIImageJPEGRepresentation(img, 1.0);
    NSDate* dat = [NSDate dateWithTimeIntervalSinceNow:0];
    NSTimeInterval a=[dat timeIntervalSince1970]*1000;
    NSString *timeString = [NSString stringWithFormat:@"%f", a];
    NSString *fileEnd=[timeString stringByAppendingString:@".jpg"];
    NSString *path_sandox = NSHomeDirectory();
    NSString *imagePath = [path_sandox stringByAppendingString:[@"/Documents/tmp" stringByAppendingString:fileEnd]];
    //把图片直接保存到指定的路径（同时应该把图片的路径imagePath存起来，下次就可以直接用来取）
    [UIImageJPEGRepresentation(img,1) writeToFile:imagePath atomically:YES];
    return imagePath;
}

//获取当前viewController
+(UIViewController *) getCurrentVC {
    UIViewController *result = nil;
    
    UIWindow * window = [[UIApplication sharedApplication] keyWindow];
    if (window.windowLevel != UIWindowLevelNormal) {
        NSArray *windows = [[UIApplication sharedApplication] windows];
        for(UIWindow * tmpWin in windows) {
            if (tmpWin.windowLevel == UIWindowLevelNormal) {
                window = tmpWin;
                break;
            }
        }
    }
    
    UIView *frontView = [[window subviews] objectAtIndex:0];
    id nextResponder = [frontView nextResponder];
    
    if ([nextResponder isKindOfClass:[UIViewController class]]) {
        result = nextResponder;
    } else {
        result = window.rootViewController;
    }
    
    return result;
}

@end
