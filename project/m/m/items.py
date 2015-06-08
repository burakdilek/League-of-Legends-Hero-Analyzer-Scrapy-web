# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html


import scrapy

class LolItem(scrapy.Item):

    url = scrapy.Field()
    ability1 = scrapy.Field()
    ability2 = scrapy.Field()
    ability3 = scrapy.Field()
    ability4 = scrapy.Field()
    ability5 = scrapy.Field()
    basic_features = scrapy.Field()
    Champion = scrapy.Field()




