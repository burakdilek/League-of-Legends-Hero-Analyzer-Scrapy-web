# -*- coding: utf-8 -*-

import scrapy
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors import LinkExtractor
from scrapy import log, Request
from .. import items


class Spider(CrawlSpider):
    name = 'lolking'
    allowed_domains = ["lolking.net"]
    start_urls = [
         "http://www.lolking.net/champions/",
         #"http://www.lolking.net/champions/aatrox"
    ]
    rules = [Rule(LinkExtractor(allow=['/champions/.*']), 'parse_lol')]

    # rule kurala uygun olanı parse lol a gönderir mesela --> http://www.lolking.net/champions/akali

     # Method ismini parse dan parse_lol e çevirdim, crawl spider için parse ismini kullanılmaması yazıyor du sitede.
     # rule /* iken .* yaptım, sorunsuz linkleri exract ediyor şimdi. 
     # Sorun aşağıdaki kodlarda artık, 

    def parse_lol(self, response):
        item = items.LolItem()
        allitem = {'champion' :[],'RP' : [], 'IP' : [], 'popularity' : [], 'win' : [], 'ban' : [], 'meta' : [] }

        # buraya gelen response --> http://www.lolking.net/champions/akali bu url veya /other_champions.
        if response.url == "http://www.lolking.net/champions/" :

            for sel in response.xpath('//*[@id="container_inner"]/div[2]/div[1]/table/tbody'):
                allitem['champion'] = sel.xpath('tr/td[1]/div[2]/a/text()').extract()
                allitem['RP'] = sel.xpath('tr/td[2]/text()').extract()
                allitem['IP'] = sel.xpath('tr/td[3]/text()').extract()
                allitem['popularity'] = sel.xpath('tr/td[4]/text()').extract()
                allitem['win'] = sel.xpath('tr/td[5]/text()').extract()
                allitem['ban'] = sel.xpath('tr/td[6]/text()').extract()
                allitem['meta'] = sel.xpath('tr/td[7]/text()').extract()
                allitem['url'] = response.url


                Features = []
                for i in range(122):
                    Features.append([allitem['champion'][i],allitem['RP'][i],allitem['IP'][i],allitem['win'][i],allitem['popularity'][i],allitem['ban'][i],allitem['meta'][i]])
                Features1 = []
                for i in range(len(Features)) :
                        hero = {}
                        a = Features[i][0]
                        hero['Champion'] = a
                        hero['RP'] = Features[i][1]
                        hero['IP'] = Features[i][2]
                        hero['win'] = Features[i][3]
                        hero['popularity'] =Features[i][4]
                        hero['ban'] = Features[i][5]
                        hero['meta'] = Features[i][6]
                        Features1.append(hero)
                item['basic_features'] = Features1
                yield item
        else :

            item['Champion'] = response.xpath('//*[@id="champion-header-name"]/text()')[0].extract()

            for sel in response.xpath('//*[@id="container_inner"]/div[2]/div[1]/div[3]/div[3]/div[4]/table/tbody'):

                item['ability1'] = sel.xpath('tr[1]/td[2]/div/div/h3/a/text()')[0].extract()
                item['ability2'] = sel.xpath('tr[2]/td[2]/div/div/h3/a/text()')[0].extract()
                item['ability3'] = sel.xpath('tr[3]/td[2]/div/div/h3/a/text()')[0].extract()
                item['ability4'] = sel.xpath('tr[4]/td[2]/div/div/h3/a/text()')[0].extract()
                item['ability5'] = sel.xpath('tr[5]/td[2]/div/div/h3/a/text()')[0].extract()

                yield item

        item_name = response.url.split("/")[4]
        print item_name
        #http://www.lolking.net/champions/aatrox
        base_comment_url = "http://www.lolking.net/champions/% s/"
        yield Request(base_comment_url % item_name, self.parse_properties, meta={'item': item})
        print "URL = % s" % response.url

    def parse_properties(self,response):
        item = response.meta["item"]

