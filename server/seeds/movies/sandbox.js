let data = [
    {
      "source_id": 146,
      "type": "sub",
      "region": "US",
      "ios_url": "hbomax://urn:hbo:episode:GVU4NYgvPQlFvjSoJAbmL",
      "android_url": "https://play.hbonow.com/episode/urn:hbo:episode:GVU4NYgvPQlFvjSoJAbmL",
      "web_url": "https://play.hbonow.com/episode/urn:hbo:episode:GVU4NYgvPQlFvjSoJAbmL",
      "format": null,
      "price": null,
      "seasons": 8,
      "episodes": 73
    },
    {
      "source_id": 144,
      "type": "sub",
      "region": "US",
      "ios_url": "aiv://aiv/resume?_encoding=UTF8&amp;asin=B007HJ84ZK&amp;time=0",
      "android_url": "https://watch.amazon.com/detail?asin=B007HJ84ZK&amp;&amp;creativeASIN=B007HJ84ZK&amp;ie=UTF8",
      "web_url": "intent://watch.amazon.com/watch?asin=B007HJ84ZK&amp;contentType=episode&amp;territory=US&amp;ref_=atv_dp_pb_core#Intent;scheme=https;package=com.amazon.avod.thirdpartyclient;component=com.amazon.avod.thirdpartyclient/com.amazon.avod.thirdpartyclient.ThirdPartyPlaybackActivity;end",
      "format": null,
      "price": null,
      "seasons": 8,
      "episodes": 73
    },
    {
      "source_id": 387,
      "type": "sub",
      "region": "US",
      "ios_url": "hbomax://urn:hbo:episode:GVU4NYgvPQlFvjSoJAbmL",
      "android_url": "https://play.hbomax.com/episode/urn:hbo:episode:GVU4NYgvPQlFvjSoJAbmL",
      "web_url": "https://play.hbomax.com/episode/urn:hbo:episode:GVU4NYgvPQlFvjSoJAbmL",
      "format": null,
      "price": null,
      "seasons": 8,
      "episodes": 73
    },
    {
      "source_id": 442,
      "type": "sub",
      "region": "US",
      "ios_url": null,
      "android_url": "https://www.directv.com/tv/Game-of-Thrones-SHNpWmVyR21jeHM9/Winter-Is-Coming-d2N0d09mMXFtdVFLU2lheTMvWDhLQT09",
      "web_url": null,
      "format": null,
      "price": null,
      "seasons": 8,
      "episodes": 73
    }
  ]


  for (var i  = 0; i < data.length; i++){
      console.log(data[i].region)
  }