import matplotlib.pyplot as plt
import numpy as np
import os
import pathlib
import sys


import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential


img_height = 360
img_width = 360


batch_size = 16

data_dir = pathlib.Path("./pictures/")


val_ds = tf.keras.utils.image_dataset_from_directory(
  data_dir,
  image_size=(img_height, img_width),
  batch_size=batch_size,
  shuffle=True
)


class_names = val_ds.class_names
num_classes = len(class_names)




data_augmentation = keras.Sequential(
  [
    layers.RandomFlip("horizontal",
                      input_shape=(img_height,
                                  img_width,
                                  3)),
    layers.RandomRotation(0.1),
    layers.RandomZoom(0.1),
  ]
)


model = Sequential([
  data_augmentation,
  layers.Rescaling(1./255),
  layers.Conv2D(16, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(32, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(64, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  # layers.Conv2D(128, 3, padding='same', activation='relu'),
  # layers.MaxPooling2D(),
  layers.Dropout(0.2),
  layers.Flatten(),
  layers.Dense(128, activation='relu'),
  layers.Dense(num_classes)
])


model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

model.load_weights('./training_7/cp-0060.ckpt')


# result = model.evaluate(val_ds, return_dict=True)
# print(result)

results = model.evaluate(val_ds)
eval_res = dict(zip(model.metrics_names, results))

print("model evaluation: ", eval_res)

labels = []
classifications = []

for elem in val_ds.take(1810):
	labels.append(elem[1].numpy())
	results = tf.nn.softmax(model.predict(elem[0]))

	for result in results:
		classifications.append(np.argmax(result.numpy()))
		'''print(
			"This image most likely belongs to {} with a {:.2f} percent confidence"
			.format(class_names[np.argmax(result)], 100 * np.max(result))
		)'''

print("Labels for matrix by index", class_names)
labels = np.concatenate(labels)

print(f"Matix: (n = {len(labels)})", tf.math.confusion_matrix(labels, classifications))

