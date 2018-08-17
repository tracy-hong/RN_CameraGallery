//
//  QRViewController.m
//  qipay
//
//  Created by wyht－ios－dev on 2018/2/6.
//  Copyright © 2018年 qitech. All rights reserved.
//

#import "WechatShareModule.h"
#import "WXApi.h"
#import <UIKit/UIKit.h>

@interface WechatShareModule ()

@end

@implementation WechatShareModule

// 导出模块，不添加参数即默认为这个类名
RCT_EXPORT_MODULE();

// 导出方法，桥接到js的方法返回值类型必须是void
RCT_EXPORT_METHOD(shareWithSession:(NSString *)url){
  [self shareImage:WXSceneSession url:url];
}

RCT_EXPORT_METHOD(shareWithTimeline:(NSString *)url){
  [self shareImage:WXSceneTimeline url:url];
}

-(UIImage *) getQRCodeImageWithStr:(NSString *)str {
  // 1.创建过滤器，这里的@"CIQRCodeGenerator"是固定的
  CIFilter *filter = [CIFilter filterWithName:@"CIQRCodeGenerator"];
  // 2.恢复默认设置
  [filter setDefaults];
  // 3. 给过滤器添加数据
  NSData *data = [str dataUsingEncoding:NSUTF8StringEncoding];
  // 注意，这里的value必须是NSData类型
  [filter setValue:data forKeyPath:@"inputMessage"];
  // 4. 生成二维码
  CIImage *outputImage = [filter outputImage];
  // 5. 显示二维码
  CGImageRef cgImage=[[[CIContext alloc] init] createCGImage:outputImage fromRect:[outputImage extent]];
  //处理为微信可以分享的图片
  return [UIImage imageWithCGImage: cgImage];
}

//分享图片
-(void) shareImage:(NSInteger)scene url:(NSString *)url {
  UIImage *image=[self getQRCodeImageWithStr:url];
  UIImage *thumbImage = [self.class compressWithImage:image maxSize:100*1024];

  WXMediaMessage *message = [WXMediaMessage message];
  [message setThumbImage:thumbImage];

  WXImageObject *ext = [WXImageObject object];
  ext.imageData = UIImageJPEGRepresentation(image, 1);
  message.mediaObject = ext;

  SendMessageToWXReq* req = [[SendMessageToWXReq alloc] init];
  req.bText = NO;
  req.message = message;
  req.scene=WXSceneTimeline;

  [WXApi sendReq:req];
}

+ (UIImage *)compressWithImage:(UIImage*)image maxSize:(CGFloat)maxSize {
    // Compress by quality
    CGFloat compression = 1;
    NSData *data = UIImageJPEGRepresentation(image, compression);
    if (data.length < maxSize)
        return image;
    
    CGFloat max = 1;
    CGFloat min = 0;
    UIImage *resultImage = nil;
    BOOL qualityCompressOK = NO;
    for (int i = 0; i < 8; ++i) {
        compression = (max + min) / 2;
        data = UIImageJPEGRepresentation(image, compression);
        resultImage = [UIImage imageWithData:data];
        if (UIImageJPEGRepresentation(resultImage, 1).length < maxSize * 0.8) {
            min = compression;
        } else if (UIImageJPEGRepresentation(resultImage, 1).length > maxSize) {
            max = compression;
        } else {
            qualityCompressOK = YES;
            break;
        }
    }
    if (qualityCompressOK)
        return resultImage;
    
    // Compress by size
    NSUInteger lastDataLength = 0;
    data = UIImageJPEGRepresentation(resultImage, 1);
    while (data.length > maxSize && data.length != lastDataLength) {
        lastDataLength = data.length;
        CGFloat ratio = (CGFloat)maxSize / data.length;
        CGSize size = CGSizeMake((NSUInteger)(resultImage.size.width * sqrtf(ratio)),
                                 (NSUInteger)(resultImage.size.height * sqrtf(ratio))); // Use NSUInteger to prevent white blank
        UIGraphicsBeginImageContext(size);
        [resultImage drawInRect:CGRectMake(0, 0, size.width, size.height)];
        resultImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
        data = UIImageJPEGRepresentation(resultImage, 1);
    }
    return resultImage;
}

@end
