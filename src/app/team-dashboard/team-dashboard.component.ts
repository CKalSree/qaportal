import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

interface TeamRecord {
  id: number;
  name: string;
  members: string[];
}

interface MemberSearchResult {
  member: string;
  teamName: string;
}

@Component({
  selector: 'app-team-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './team-dashboard.component.html',
  styleUrl: './team-dashboard.component.css'
})
export class TeamDashboardComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'qa-portal-teams';

  teamName = '';
  memberInput = '';
  memberSearch = '';
  searchedMember = '';
  hasSearched = false;
  storageMessage = '';
  teams: TeamRecord[] = [];
  private nextTeamId = 1;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      const savedTeams: unknown = JSON.parse(
        localStorage.getItem(this.storageKey) ?? '[]'
      );

      if (!this.isTeamRecords(savedTeams)) {
        this.storageMessage = 'Saved team data could not be read.';
        return;
      }

      this.teams = savedTeams;
      this.nextTeamId = Math.max(0, ...this.teams.map((team) => team.id)) + 1;
    } catch {
      this.storageMessage = 'Team data could not be loaded from this browser.';
    }
  }

  get memberSearchResults(): MemberSearchResult[] {
    const query = this.searchedMember.toLocaleLowerCase();
    return this.teams.flatMap((team) =>
      team.members
        .filter((member) => member.toLocaleLowerCase().includes(query))
        .map((member) => ({ member, teamName: team.name }))
    );
  }

  addTeam(): void {
    const name = this.teamName.trim();
    const members = this.memberInput
      .split(',')
      .map((member) => member.trim())
      .filter((member) => member.length > 0);

    if (!name || members.length === 0) {
      return;
    }

    this.teams = [
      ...this.teams,
      { id: this.nextTeamId++, name, members }
    ];
    this.saveTeams();
    this.teamName = '';
    this.memberInput = '';
  }

  deleteTeam(id: number): void {
    this.teams = this.teams.filter((team) => team.id !== id);
    this.saveTeams();
  }

  searchMembers(): void {
    this.searchedMember = this.memberSearch.trim();
    this.hasSearched = true;
  }

  private saveTeams(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.teams));
      this.storageMessage = '';
    } catch {
      this.storageMessage = 'Changes could not be saved in this browser.';
    }
  }

  private isTeamRecords(value: unknown): value is TeamRecord[] {
    return Array.isArray(value) && value.every((team: unknown) => {
      if (typeof team !== 'object' || team === null) {
        return false;
      }

      const record = team as Partial<TeamRecord>;
      return Number.isInteger(record.id)
        && typeof record.name === 'string'
        && Array.isArray(record.members)
        && record.members.every((member) => typeof member === 'string');
    });
  }
}