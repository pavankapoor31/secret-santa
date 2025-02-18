"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentGenerator = void 0;
class AssignmentGenerator {
    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    isValidAssignment(santa, recipient, previousAssignments) {
        // Can't be assigned to self
        if (santa.Employee_Name === recipient.Employee_Name) {
            return false;
        }
        // Check if this pair existed in previous assignments
        return !previousAssignments.some(assignment => assignment.santa === santa.Employee_Name &&
            assignment.recipient === recipient.Employee_Name);
    }
    generateAssignments(employees, previousAssignments) {
        const assignments = [];
        let attempts = 0;
        const maxAttempts = 100;
        while (attempts < maxAttempts) {
            try {
                const shuffledEmployees = this.shuffle(employees);
                const tempAssignments = [];
                const availableRecipients = [...shuffledEmployees];
                for (const santa of shuffledEmployees) {
                    const validRecipients = availableRecipients.filter(recipient => this.isValidAssignment(santa, recipient, previousAssignments));
                    if (validRecipients.length === 0) {
                        throw new Error('No valid recipient found');
                    }
                    const recipient = validRecipients[Math.floor(Math.random() * validRecipients.length)];
                    const recipientIndex = availableRecipients.findIndex(r => r.Employee_Name === recipient.Employee_Name);
                    availableRecipients.splice(recipientIndex, 1);
                    tempAssignments.push({
                        Employee_Name: santa.Employee_Name,
                        Employee_EmailID: santa.Employee_EmailID,
                        Secret_Child_Name: recipient.Employee_Name,
                        Secret_Child_EmailID: recipient.Employee_EmailID
                    });
                }
                return tempAssignments;
            }
            catch (error) {
                attempts++;
                if (attempts === maxAttempts) {
                    throw new Error('Could not generate valid assignments after maximum attempts');
                }
            }
        }
        return assignments;
    }
}
exports.AssignmentGenerator = AssignmentGenerator;
