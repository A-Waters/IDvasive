import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential
import numpy as np
from PIL import ImageFile



class wrapper():
    def __init__(self) -> None:

        ImageFile.LOAD_TRUNCATED_IMAGES = True
        self.img_height = 360
        self.img_width = 360
        self.num_classes = 4
        self.classes = ['Black_Spruce_Spring', 'Northern_White_Cedar_Spring', 'Eastern_Hemlock_Spring', 'Northern_White_Pine_Spring']

        data_augmentation = keras.Sequential(
        [
            layers.RandomFlip("horizontal",
                            input_shape=(self.img_height,
                                        self.img_width,
                                        3)),
            layers.RandomRotation(0.1),
            layers.RandomZoom(0.1),
        ])

        self.model = Sequential([
            data_augmentation,
            layers.Rescaling(1./255),
            layers.Conv2D(16, 3, padding='same', activation='relu'),
            layers.MaxPooling2D(),
            layers.Conv2D(32, 3, padding='same', activation='relu'),
            layers.MaxPooling2D(),
            layers.Conv2D(64, 3, padding='same', activation='relu'),
            layers.MaxPooling2D(),
            layers.Dropout(0.2),
            layers.Flatten(),
            layers.Dense(128, activation='relu'),
            layers.Dense(self.num_classes)
        ])

        self.model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

        self.model.load_weights('cp-0060.ckpt')

        

    def classify(self, fileName):


        image = tf.keras.utils.load_img(
            fileName,
            grayscale=False,
            color_mode='rgb',
            target_size=(self.img_height, self.img_width),
            interpolation='nearest'
        )
        input_arr = tf.keras.preprocessing.image.img_to_array(image)
        input_arr = np.array([input_arr])  # Convert single image to a batch.
        predictions = self.model.predict(input_arr)
        print(predictions)
        print(self.classes[np.argmax(predictions)])
        return self.classes[np.argmax(predictions)]

