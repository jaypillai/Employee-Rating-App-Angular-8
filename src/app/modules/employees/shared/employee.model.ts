import {Deserializable} from '../../../shared/interfaces/deserializable.interface';

export class Employee implements Deserializable {
  id: string;
  name: string;
  alterEgo: string;
  likes: number;
  default: boolean;
  avatarThumbnailUrl: string;
  ratings: number;

  constructor(employee: any = {}) {
    this.id = employee.id;
    this.name = employee.name || '';
    this.alterEgo = employee.alterEgo || '';
    this.likes = employee.likes || 0;
    this.default = employee.default || false;
    this.avatarThumbnailUrl = employee.avatarThumbnailUrl || '';
    this.ratings = employee.ratings || 0;
  }

  like() {
    this.likes += 1;
  }

  updateRating(rating) {
    // tslint:disable-next-line: radix
    this.ratings = Math.round((((this.likes * this.ratings) + rating) / (this.likes + 1))) * 1000 / 1000;
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
