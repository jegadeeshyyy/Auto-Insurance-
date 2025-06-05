import { Component, OnInit } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
[x: string]: any;
  showProfileCard = false;
  profileImage = 'assets/userlogo001.png';
  isLoading = false;

 
 constructor( private router: Router) {}

  ngOnInit(): void {
   
   
  }

  
  toggleProfileCard() {
    this.showProfileCard = !this.showProfileCard;
 
  }

  closeProfileCard() {
    this.showProfileCard = false;
   
    
  
  }

 

 
 

  


}