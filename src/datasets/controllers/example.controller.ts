import { Controller, Get, HttpCode, HttpStatus, Post, Version } from '@nestjs/common';
import { ApiTags, ApiExcludeController } from '@nestjs/swagger';

import { ConfigureAdapter } from '@leek/configure';
import { COSLoader } from '@leek/langchain';

import { LLMGeneratorService } from '../services/llm-generator.service';

@ApiExcludeController()
@ApiTags('测试')
@Controller('example')
export class ExampleController {
  constructor(
    private readonly LLMGeneratorService: LLMGeneratorService,
    private readonly configureService: ConfigureAdapter,
  ) {}

  @Post('generateQaDocumentFromTextAndLanguage')
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  async generateQaDocumentFromTextAndLanguage() {
    return this.LLMGeneratorService.generateQaDocumentFromTextAndLanguage(
      `义乌市，位于中国浙江省，是一个著名的旅游和商业城市。这里有许多值得一游的景点，包括南山公园、福田湿地公园、开心谷、松瀑山风景区、威尼斯水城、绣湖公园、桃花坞、天龙风景区等。此外，义乌中国国际商贸城购物旅游区和义乌佛堂古镇也是游客们的热门选择。在这些地方，你可以深入体验当地的文化和风俗，了解其丰富的历史和传统。

义乌市也是美食的天堂，有许多特色美食等待你的品尝。其中包括糖烊、三分饼、义乌拉面、佛堂千张面、上溪牛杂汤、义乌腊肠、豆皮素包和义亭油酥等。这些美食各具特色，口感独特，让人回味无穷。

义乌市的夜市也非常有名，其中最大的是宾王夜市，位于义乌三挺路1号。这里有800多个摊位，包括百货摊位、小吃摊位及便民服务摊位。此外，青口夜市也是一个热门的夜市，吸引了本地、外地甚至世界各地的游客来此感受人间烟火气。

Chinagoodshinagoods平台是一款数字化贸易综合服务平台，它集中发挥义乌小商品市场的整体资源优势，无缝对接线上线下渠道，帮助用户一键触达全球小商品。无论你是经营户、生产厂家、采购商还是贸易服务商，只要有问题就上Chinagoods，让贸易更简单，让义乌市场更具竞争力和发展活力。

义乌在国际贸易中具有重要地位。它是全球最大的小商品批发市场之一，每年吸引来自全球各地的商人前来采购。这使得义乌成为连接国内和国际贸易的重要平台。此外，义乌市场是连接国内国际贸易供应链的重要平台，处于全球小商品供应链的关键节点，对畅通内循环、提升外循环，服务“双循环”新格局具有举足轻重的地位。

浙江中国小商品城集团股份有限公司（简称“义乌商城集团”），创建于1993年12月，系国有控股上市企业。公司运营全球最大的小商品批发市场——义乌中国小商品城，市场现有营业面积640余万平方米，商位7. 5万个，经营26个大类、210万个单品，与全球230多个国家和地区有贸易往来。公司致力于为210多万家中小微企业搭建共享式贸易服务平台，在推动市场主业发展的同时，大力发展信息数据、进口贸易、仓储物流、国际拓展、供应链金融、酒店管理、物业房产、会展旅游等相关行业，努力成为赋能市场大众贸易的全球商贸领军企业，加速打造“全球一流国际贸易综合服务商”。

义乌电商发展情况非常活跃。近年来，义乌电商交易额不断增长，跨境电商也发展迅速，第三方平台账号数量不断增加。义乌的电商产业已经形成了较为完整的产业链，涵盖了产品研发、生产、销售、物流等多个环节。同时，义乌的电商服务也日益完善，包括仓储、物流、支付、客服等方面的服务。

义乌是全球最大的小商品集散中心，也是中国电商的重要发源地之一。近年来，随着直播电商的兴起，义乌的直播电商也得到了快速发展。义乌直播电商行业的发展情况可以从以下几个方面来看：市场规模不断扩大、产业链不断完善、品牌影响力不断提升。

义乌电商供应链企业主要集中在义乌国际商贸城周边区域。以下是一些比较集中的地点：义乌国际商贸城、义乌幸福里电子商务区、义乌青口电子商务区。

义乌的库存批发市场有很多，以下是一些比较知名的市场：义乌金福源货批发市场、义乌五爱库存街、义乌宾王服装货批发市场、义乌梅湖库存贸易专业街。

义乌是一个充满活力和机遇的城市，对于想要创业的人来说，是一个非常适合的地方。这里有优越的商业环境、大市场需求、相对较低的成本、政府的支持以及发达的社交网络。

义乌创业环境和其他地方相比，有以下优势：地理位置优越、制造业发达、市场需求大、成本相对较低、政府支持、社交网络发达。

义乌是一个全球知名的小商品集散中心，有许多适合创业和发展的行业。以下是一些可能适合的领域：小商品批发、跨境电商、制造业、服务业。

义乌市政府对大学生到义乌创业提供了以下政策扶持：创业补贴、创业担保贷款、免费办公场所、免费培训、创业导师帮扶、税收优惠。

Chinagoods和义乌购都是属于小商品城的平台，但它们有一些区别。总体来说，Chinagoods更注重履约和服务环节，而义乌购更注重商品展示和交易。
`,
      'china',
    );
  }

  @Get()
  async excel() {
    const loader = new COSLoader({
      SecretId: this.configureService.TENCENT.SECRET_ID,
      SecretKey: this.configureService.TENCENT.SECRET_KEY,
      Bucket: this.configureService.TENCENT.COS_BUCKET,
      Region: this.configureService.TENCENT.COS_REGION,
      Key: 'leek/upload_files/52f9bfc0-6c2b-41e7-a396-bb43b3d7dfc9.xlsx',
    });
    const docs = await loader.load();

    console.log(docs, '-->-');
  }
}
