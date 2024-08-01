//This program is just for refernce. This program has been wrote and deployed on the solana playground due to some installation issues. 

use anchor_lang::prelude::*;
use anchor_lang::solana_program::{entrypoint::ProgramResult, system_instruction};

declare_id!("PROGRAM_ID");

#[program]
pub mod healthcare_sol {
    use super::*;

    pub fn register_user(
        ctx: Context<RegisterUser>,
        first_name: String,
        last_name: String,
        age: u8,
        image: String,
        address: String,
    ) -> ProgramResult {
        let user_account = &mut ctx.accounts.user_account;
        let authority = &ctx.accounts.authority;

        user_account.first_name = first_name;
        user_account.last_name = last_name;
        user_account.age = age;
        user_account.image = image;
        user_account.address = address;
        user_account.authority = authority.key();
        Ok(())
    }

    pub fn register_doctor(
        ctx: Context<RegisterDoctor>,
        name: String,
        qualification: String,
        image: String,
        specialization: String,
        description: String,
        address: String,
        rating: u8,
        language: String,
        doctor_email: String, // Added doctor_email
    ) -> ProgramResult {
        let doctor_account = &mut ctx.accounts.doctor_account;
        let authority = &ctx.accounts.authority;

        doctor_account.name = name;
        doctor_account.qualification = qualification;
        doctor_account.image = image;
        doctor_account.specialization = specialization;
        doctor_account.description = description;
        doctor_account.address = address;
        //we've used this rating as fees that is charged by the doctor as there was a confusion while writing this progam, apologies for inconvience!
        doctor_account.rating = rating;
        doctor_account.language = language;
        doctor_account.doctor_email = doctor_email; // Set doctor_email
        doctor_account.authority = authority.key();
        Ok(())
    }

    pub fn transfer_fee(ctx: Context<TransferFee>, amount: u64) -> ProgramResult {
        let from = &ctx.accounts.user_authority;
        let to = &ctx.accounts.doctor_authority;

        let ix = system_instruction::transfer(&from.key(), &to.key(), amount);
        solana_program::program::invoke(
            &ix,
            &[from.to_account_info(), to.to_account_info()],
        )?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct RegisterUser<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 32 + 1 + 256 + 256 + 32, // Example sizes for fields
        seeds = [b"user", authority.key().as_ref()],
        bump
    )]
    pub user_account: Account<'info, UserState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RegisterDoctor<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 64 + 256 + 256 + 128 + 128 + 32 + 1 + 64 + 256 + 32, // Updated space for doctor_email
        seeds = [b"doctor", authority.key().as_ref()],
        bump
    )]
    pub doctor_account: Account<'info, DoctorState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct TransferFee<'info> {
    #[account(mut)]
    pub user_authority: Signer<'info>,
    #[account(mut)]
    pub doctor_authority: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct UserState {
    pub first_name: String,
    pub last_name: String,
    pub age: u8,
    pub image: String,
    pub address: String,
    pub authority: Pubkey,
}

#[account]
pub struct DoctorState {
    pub name: String,
    pub qualification: String,
    pub image: String,
    pub specialization: String,
    pub description: String,
    pub address: String,
    pub rating: u8,
    pub language: String,
    pub doctor_email: String, // Added doctor_email
    pub authority: Pubkey,
}
