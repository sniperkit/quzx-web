import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'stringdate'})
export class StringDatePipe implements PipeTransform {
  transform(input: number): string {
    var a = new Date(input * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
}

@Pipe({name: 'cleandate'})
export class CleanDatePipe implements PipeTransform {
  transform(input: string): string {
    var rightNow: any = new Date();
    var then: any = new Date(input);
    var diff = rightNow - then;

    var second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24,
      week = day * 7;

    if (isNaN(diff) || diff < 0) {
      return ""; // return blank string if unknown
    }

    if (diff < second * 2) {
      // within 2 seconds
      return "right now";
    }

    if (diff < minute) {
      return Math.floor(diff / second) + " seconds ago";
    }

    if (diff < minute * 2) {
      return "about 1 minute ago";
    }

    if (diff < hour) {
      return Math.floor(diff / minute) + " minutes ago";
    }

    if (diff < hour * 2) {
      return "about 1 hour ago";
    }

    if (diff < day) {
      return  Math.floor(diff / hour) + " hours ago";
    }

    if (diff > day && diff < day * 2) {
      return "yesterday";
    }

    if (diff < day * 365) {
      return Math.floor(diff / day) + " days ago";
    }

    else {
      return "over a year ago";
    }
  }
}
