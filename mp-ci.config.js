module.exports = {
    // 支付宝ci必填
    alipay: {
      authentication: {
        // 工具 ID
        toolId: '4f9015a0b7c94a08a65966c28b821c36',
        // 私钥
        privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCYh5pbLka3tCy4hCo7MHwj01hxrHJ9gtoMht1MwGdXBWDDEx8FoYVt5l02j5RXQ4usCEj4LuiSWL29hmon7Pc8ipX0gHcxHWta5Zywefnd1qfFUschco8c33O304qpooQvTwmPlzlPWQsV1uPJXfCKcAIOwvSoJKwHpsq8QdtT997qJbQ+rVi5u78L1Nhu2VnPtphnwImGgnnA910ywckUb08Iu0yeVS2ra/crBOpEQYZVFSue5r68S5tOMqsVqQ47Vvaz9aJbog/Uo+Kax8Q5F8bTSeN6Po0/vv49MSywo5pEHRzHKRHvyZRRHNMje9lbp+7NG8cdoc2N1pAGuho1AgMBAAECggEAOhPYCEP0lVo7dP6N/f+WJSYCFTZuWbALSp3HgcP5FT9s+po7Q6+e2JvQfkfpWdjUQ+rbrfReherYRGP747vs39Z9Bp4rxD3JdNDc+q1XIMrtEstUGz49k+bZbvNTZwgEgOb9YvlXzwi+mdA655+nSW8guXIuKh/ciQVPSKNi2fN++kQfaS5hX+6UwWM7YVhwuatW56KZcwBMotIfAS0xTbvNxpksWxiQvOmuAaJb3vaTdD91u9cTZnQR8bJaVncT3N9iZh9dF0yrxEjnkrQjn00/wGH5x0bkpO6oVXGKoQFfYdiNxd34yUlrOJGn7rOFTzfxi7NRoryL1HJo30F1OQKBgQDPcyWtcJQ0yB4DCt4dueJAB2AFbSEud1x4nWuI5zdK/0Y2udc/fGYFjw3+BU9+eqLYrisQ+it397Kn/vh7A7weJU/p22hoEzdMnRB8yzs86CzXwespkc13xcNorber+46f2ae8ofLx1Gy7mhtH30xH+Tdnuxmm19kFlTiUTREugwKBgQC8Og0URZiCR/8QRT87LuIxQPYdQjbJPlzFIinrnEa860W+JidB9oea9DrmImbNVf9qTeYqM/+rfpNoFBJSSQWOR0cidMa5+oN5u7QFuuk5dPqef5gc2izNNvqbXa3nhCWnt4DZUaKOFvMCwYCLM31uw3SFTzly4GI6Q+9yHbi25wKBgQCOXpcABeAgrSozqlSvj++fQ7B5aOC50/7pZBf118DRvonAayA3GLennvraV2isA5wZGsbBmv8UETFSLCD5w6FqCu9iLkrkCjQMZ0p2ar+X2DtWQ2aRm9eoGFg4UehYpobGW4jLY1Wo88E/qs6IL85ZIscMcJJ1N3Ngan1vAckF4wKBgQCcWkBZEYKg3ftS4aKnn8dGkKagIUtvGX1oR3u4+mSMM4cIb5r2oTl9jtiKKBNrB7+V50WE0xLSut7peprJfVy/FhhR19znyd+CtFfS1rM7Bh/UnzqU5OqIQN4lRsjZYp0A116Rps036HpOVLxZZRkRdAyLXAbllNwjeCEjkurICwKBgBkzpZH4T+MbWomvQEuxVNrppTLSFnocqS1DLDU+iarKSXGRQtsi3GWNJXB2vJmBO3XIunPkz+EYzKRUO2k1c+Cwh2MRI3vxqRf4M7GQaRpLGMhMtnw2TlvUIxvNf6Ajc30E6BhSzEAcBSsOBRdgxB19ZP8yXO4VM2LlnIPFF1Ci\n-----END PRIVATE KEY-----\n',
      },
      projectPath: 'dev/mp-alipay',
      pagesListPath: 'dev/mp-alipay/app.json',
    //   larkParams: {
    //     isPushMessageToLark: true,
    //     larkRobotAppId: "cli_a58d09de7afd100c",
    //     larkRobotAppSecret: "Vk4XeM577bPNWPbnucSxAbvuwVsWfZ2R",
    //     larkRobotWebhook: "https://open.feishu.cn/open-apis/bot/v2/hook/a2c294ea-41d4-4d5a-b863-46849948c8e7",
    //     messageTemplateId: "ctp_AAwkkCHikd0T"
    //   },
    formList: {
      pageQuery: '',
      test1: '',
      test2: ''
    },
      dynamicConfig: {
        // path: './util/useDynamic.js',
        replace: function () {
          // processing data
          return [
                  {
                      appid: '2021004105633109',
                      version: '0.0.22',
                      replace_list: [
                        {filePath: 'dev/mp-alipay/pages/index/index.json',
                        type: 'json',
                        editValue: {
                          defaultTitle: '测试替换title'
                        }}
                      ],
                  },
                  // ..array
              ]
        },
      },
    },
    // 微信ci必填
    wechat: {
      // 私钥
      projectPath: 'dist/build/mp-weixin',
      larkParams: {
        isPushMessageToLark: true,
        larkRobotAppId: "cli_a58d09de7afd100c",
        larkRobotAppSecret: "Vk4XeM577bPNWPbnucSxAbvuwVsWfZ2R",
        larkRobotWebhook: "https://open.feishu.cn/open-apis/bot/v2/hook/a2c294ea-41d4-4d5a-b863-46849948c8e7",
        messageTemplateId: "ctp_AAwkkCHikd0T"
      },
      dynamicConfig: {
        replace: function () {
            return [
                {
                    appid: 'wx29084602c7589dba',
                    privateKey: '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA1J+5kLJTe7E4FnWwPXvoHBugJ2kk7nqsyBb8cbz7XBVJrMXxatg6D5VKHbPzDlv++UvG9HF+c/0R74CJp46U8e4W9/n2UstFlW2ogpfGeavS/DnWe3GIwpkMptmNj3FLLYrpXPMaW1xuh1lHaoO6uo718HOaNoHmcvFdvZaF8Rh4vJ1bavj+QH5pEQ+3BQAUPMCa8b5tjmIbBEqaeufhOYoqWCxLFPuEzl7xqofC0SGRH/Y2mAjkr3RUAVNVxu6uVZJnv1epF15XvTJ3pFatMy+xtMGj+YcYoGQNu/0L7k4jG7v2tEL3vrQ+daxKndDsRpOFXEhboLNUq6kuZQfVYQIDAQABAoIBADfurIn73yoyvGZsHyiNZ8m9GqxDZIu3iaw5H79rz1Ox5eelSpSovN1MkGqv48hrOu+pl3TGRlWMxSMT1SJWx6e80h35i2rMPknIxwNTmcp4ANCJBnsCqs9GI6XgpPSPAQ/B8xGYgd52ujywp7DFZmGdKeVPA8pC8bRa+iXdau643omJ+H2RjZ1wSTszUMLgJCaYfkY69c7HkFeowLWSbihOlj/bKvDporv7nsIKxhxRE9WEOKwF8VvxNR4EniSk+4nqUcEMwGn+qIeIpEdbGopNMaFdYUsZ5Eu8sr4vJLDplOyKQqvoXrtFyRPdH3SmXbynqwkpm/QZPhsHXKn2LuECgYEA6zfn4XGGWkoiuqULxTkAvPBFTbde6IMof6Hy0ZuawTE27/xz1RvnMyXE5Zuqq5jbe6Hq2o8wGVZT5CYiUrR15L67E8GUxQpCM8PfrTzcfToMFV9ecLYJiErmST4O2vcgW1mELrLd/M5mJX1p9Im7KM1+5cOuj7f9fhRkbgHNXWsCgYEA52jI7a+ljjzz4CUHNj+wW5gVisgxuWfsSRJg7SEQ9dH3TaA+TLDnXGKoJJBx0WH7ermtih9wLRZTnwdbXAedfe8i8e/EDpkP/HFJlkD/U6ZYDxwGYg+mMzwsaqQnaDQlQmGmoJfcVBk4xNbnpcM4DzfmxhKmya+cvXZIFRFWX2MCgYEAhmswbDlAGiD7r8XZ8B8fONnmAP+lkSJC5o1aAkb2LSk+x+5xE3wap7QRzVUkN2PnKcPiPnxNdG1NC7hvLOxL4yjMKAIcTm4KXyK0lH+PUVD2zs/tXGPrFqQW7gw02RUYvJtvWnCFQ49/+DSvdDuxZSPqPMuS2ja++moU6njFL3kCgYBZEoJUywlEqL2Oh3IxNW6isvWHx+sr3I6cydA5NkMa+8jfPlD8oBNOAkOKX3cQC1ELOjFMOzGoiTGCwwgtcljywnuG+K1UmSIIH2sdxMMC5cJ7fmQOlst4aS8HlUv91iSJWqESq6GJVXP+gGIF8hC/+tp/X2qHs2r3mnHAej3u1QKBgH1EoHzVMKgehyB7k/SgNID9OJ+9PrM/tVjULQCRf4r368PuQXQzoatyzBNPkVFI9/K7BSuhnDLNQAMQmvWPg7pIj73xaRBm3x8ZwxiguJreo+Uz7qpSUk0RrMiKly5wIvYDRInlb44gkKcCOCt/CDrRTgOuXl6eKQbuIfU4Crfk\n-----END RSA PRIVATE KEY-----\n',
                    version: '1.0.9',
                    replace_list: [{
                        type: 'json',
                        filePath: 'src/pages.json',
                        editValue: {
                            'globalStyle.navigationBarTitleText': "手机卡办理"
                        }
                    }]
                }
            ]
        }
      }
    },
    // uni-app cli config
    uniAppConfig: {},
  }