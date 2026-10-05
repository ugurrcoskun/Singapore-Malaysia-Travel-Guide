# Singapore–Malaysia Travel Guide

Telefonda kullanılmak üzere hazırlanmış statik gezi rehberi. Türkçe–Mandarin/İngilizce/Malayca hazır cümleler, sesli okuma, serbest çeviri ve Singapur gezi haritası içerir.

## Yerel önizleme

```sh
python3 -m http.server 4173 --directory dist
```

Ardından `http://127.0.0.1:4173` adresini açın. Uygulama için kurulum veya derleme gerekmez.

## Vercel

GitHub deposunu Vercel'e bağlayın. Depo kökü proje kökü olarak kalsın. `vercel.json`, Framework Preset'i **Other**, Build Command'ı boş ve Output Directory'yi **dist** olarak ayarlar. Deploy ile `dist/index.html` yayımlanır.

## Kullanım notları

- Hazır cümleler ve ses dosyaları çevrimdışı kullanılabilir. İlk açılışta dosyaların önbelleğe alınması için internet gerekir.
- Gezi işaretleri, favoriler ve kişisel cümleler tarayıcının yerel deposunda tutulur; cihazlar arasında eşitlenmez.
- Harita görüntüsü OpenStreetMap, serbest çeviri MyMemory üzerinden internete bağlanır.
- Google Maps listelerindeki değişiklikler bu uygulamaya otomatik aktarılmaz.

İçerik `dist/`, yer verilerinin hazırlık dosyaları `data/`, yardımcı betikler `scripts/` altındadır.
