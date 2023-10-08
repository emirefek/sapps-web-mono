from zipfile import ZipFile
import os

# Zip dosyasının yolu
zip_file_path = '2000-2022 MODIS - Türkiye.zip'
extracted_folder_path = 'turkey_fire_data'

# Zip dosyasını açma ve içeriğini belirtilen klasöre çıkarma
with ZipFile(zip_file_path, 'r') as zip_ref:
    zip_ref.extractall(extracted_folder_path)

# Çıkarılan dosyaların listesini alma
extracted_files = os.listdir(extracted_folder_path)
extracted_files

# Çıkarılan klasörün içindeki dosyaları listeleme
inner_folder_path = os.path.join(extracted_folder_path, extracted_files[0])
inner_files = os.listdir(inner_folder_path)
inner_files[:10], len(inner_files)  # İlk 10 dosyayı ve toplam dosya sayısını gösterme

import pandas as pd

# İlk CSV dosyasını okuma
first_csv_path = os.path.join(inner_folder_path, inner_files[0])
first_df = pd.read_csv(first_csv_path)

# İlk beş satırı gösterme
first_df.head()

# Tüm CSV dosyalarını okuyup tek bir DataFrame'de birleştirme
all_data = pd.DataFrame()

for file in inner_files:
    file_path = os.path.join(inner_folder_path, file)
    df = pd.read_csv(file_path)
    all_data = pd.concat([all_data, df], ignore_index=True)

# Toplam satır ve sütun sayısını gösterme
all_data.shape

# Enlem ve boylam koordinatlarına göre gruplama ve sayma
fire_counts = all_data.groupby(['latitude', 'longitude']).size().reset_index(name='count')

# İlk beş satırı gösterme
fire_counts.head()

import folium

# Türkiye'nin koordinatları
turkey_coordinates = [38.9637, 35.2433]

# Folium haritasını oluşturma
fire_map = folium.Map(location=turkey_coordinates, zoom_start=6)

# Yangın koordinatlarını haritaya ekleme
for index, row in fire_counts.iterrows():
    # Yangın sayısına göre marker boyutunu ayarlama
    radius = row['count'] / 1000  # Burada boyutu istediğiniz gibi ayarlayabilirsiniz
    if radius > 1:  # En az belirli bir boyuta sahip markerları gösterme
        folium.CircleMarker(location=(row['latitude'], row['longitude']),
                            radius=radius,
                            color='red',
                            fill=True,
                            fill_color='red',
                            fill_opacity=0.6).add_to(fire_map)

# Haritayı gösterme
fire_map.save('turkey_fire_map.html')  # Haritayı HTML dosyası olarak kaydetme
fire_map  # Haritayı bu hücrede gösterme

import matplotlib.pyplot as plt
from mpl_toolkits.basemap import Basemap

# Harita oluşturma
plt.figure(figsize=(12, 8))

# Türkiye haritasını çizme
m = Basemap(projection='merc', llcrnrlat=35, urcrnrlat=43, llcrnrlon=25, urcrnrlon=45, resolution='i')
m.drawmapboundary(fill_color='aqua')
m.fillcontinents(color='white', lake_color='aqua')
m.drawcoastlines()
m.drawcountries()

# Yangın verilerini haritaya eklemek için enlem ve boylamı ayarlama
lats = all_data['latitude'].values
lons = all_data['longitude'].values

# Enlem ve boylamı harita koordinatlarına dönüştürme
x, y = m(lons, lats)

# Yangın verilerini haritaya eklemek için scatter plot kullanma
m.scatter(x, y, c='red', s=1, alpha=0.5)

plt.title('2000-2022 Fire Map of Türkiye')
plt.show()

import numpy as np  # Numpy kütüphanesini içe aktarma eksikti, şimdi düzeltiliyor.

# Haritayı yeniden oluşturma
plt.figure(figsize=(12, 8))

# Türkiye haritasını çizme
m = Basemap(projection='merc', llcrnrlat=35, urcrnrlat=43, llcrnrlon=25, urcrnrlon=45, resolution='i')
m.drawmapboundary(fill_color='aqua')
m.fillcontinents(color='white', lake_color='aqua')
m.drawcoastlines()
m.drawcountries()

# Yangın verilerini haritaya eklemek için enlem ve boylamı ayarlama
lats = all_data['latitude'].values
lons = all_data['longitude'].values

# Enlem ve boylamı harita koordinatlarına dönüştürme
x, y = m(lons, lats)

# Yangın verilerini bir heatmap olarak haritaya eklemek
heatmap, xedges, yedges = np.histogram2d(y, x, bins=500)
extent = [xedges[0], xedges[-1], yedges[0], yedges[-1]]

# Log norm scale
plt.imshow(heatmap.T, extent=extent, origin='lower', norm=LogNorm(), cmap='hot', alpha=0.6)

plt.colorbar(label='Yangın Sayısı')
plt.title('2000-2022 Fire Map of Türkiye')
plt.show()

import folium
from folium.plugins import HeatMap

# Folium haritasını oluşturma
fire_map = folium.Map(location=turkey_coordinates, zoom_start=6, tiles="Stamen Terrain")

# Yangın koordinatlarını bir liste içinde toplama
fire_data = all_data[['latitude', 'longitude']].values.tolist()

# Isı haritası katmanını oluşturma ve haritaya eklemek
HeatMap(fire_data, radius=8, gradient={0.2: 'blue', 0.4: 'green', 0.6: 'yellow', 0.8: 'orange', 1: 'red'}).add_to(fire_map)

# Haritayı gösterme
fire_map.save('turkey_fire_heatmap.html')  # Haritayı HTML dosyası olarak kaydetme
fire_map  # Haritayı bu hücrede gösterme

# Folium haritasını tekrar oluşturma
fire_map = folium.Map(location=turkey_coordinates, zoom_start=6, tiles="Stamen Terrain")

# Daha koyu renklerle güncellenmiş ısı haritası katmanını oluşturma
HeatMap(fire_data, radius=8, max_zoom=13, 
        gradient={0.2: 'yellow', 0.4: 'orange', 0.6: 'red', 0.8: 'darkred', 1: 'black'}).add_to(fire_map)

# Haritayı gösterme
fire_map.save('turkey_fire_heatmap_updated.html')  # Haritayı HTML dosyası olarak kaydetme
fire_map  # Haritayı bu hücrede gösterme

# Folium haritasını tekrar oluşturma, daha da büyük bir radius ile
fire_map = folium.Map(location=turkey_coordinates, zoom_start=6, tiles="Stamen Terrain")

# Daha da büyük radius ile güncellenmiş ısı haritası katmanını oluşturma
HeatMap(fire_data, radius=7, max_zoom=13, 
        gradient={0.2: 'yellow', 0.4: 'orange', 0.6: 'red', 0.8: 'darkred', 1: 'black'}).add_to(fire_map)

# Haritayı gösterme
fire_map.save('turkey_fire_heatmap_even_larger_radius.html')  # Haritayı HTML dosyası olarak kaydetme
fire_map  # Haritayı bu hücrede gösterme
