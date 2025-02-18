import { Employee, Assignment, PreviousAssignment } from '../types';

export class AssignmentGenerator {
  private shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private isValidAssignment(
    santa: Employee,
    recipient: Employee,
    previousAssignments: PreviousAssignment[]
  ): boolean {
    // Can't be assigned to self
    if (santa.Employee_Name === recipient.Employee_Name) {
      return false;
    }

    // Check if this pair existed in previous assignments
    return !previousAssignments.some(
      assignment => 
        assignment.santa === santa.Employee_Name && 
        assignment.recipient === recipient.Employee_Name
    );
  }

  generateAssignments(
    employees: Employee[],
    previousAssignments: PreviousAssignment[]
  ): Assignment[] {
    const assignments: Assignment[] = [];
    let attempts = 0;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
      try {
        const shuffledEmployees = this.shuffle(employees);
        const tempAssignments: Assignment[] = [];
        const availableRecipients = [...shuffledEmployees];

        for (const santa of shuffledEmployees) {
          const validRecipients = availableRecipients.filter(recipient => 
            this.isValidAssignment(santa, recipient, previousAssignments)
          );

          if (validRecipients.length === 0) {
            throw new Error('No valid recipient found');
          }

          const recipient = validRecipients[Math.floor(Math.random() * validRecipients.length)];
          const recipientIndex = availableRecipients.findIndex(
            r => r.Employee_Name === recipient.Employee_Name
          );
          availableRecipients.splice(recipientIndex, 1);

          tempAssignments.push({
            Employee_Name: santa.Employee_Name,
            Employee_EmailID:santa.Employee_EmailID,
            Secret_Child_Name: recipient.Employee_Name,
            Secret_Child_EmailID:recipient.Employee_EmailID
          });
        }

        return tempAssignments;
      } catch (error) {
        attempts++;
        if (attempts === maxAttempts) {
          throw new Error('Could not generate valid assignments after maximum attempts');
        }
      }
    }

    return assignments;
  }
}