import EventEntity from "../entities/events.entity";
import NewEntity from "../entities/news.entity";

export default interface INewsRepository {
  getListNews(): Promise<NewEntity>
  getListEvents(): Promise<EventEntity>
  getListEvents2(): Promise<NewEntity>
}
